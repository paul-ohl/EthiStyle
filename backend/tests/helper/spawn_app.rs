#![allow(clippy::unwrap_used)]
use std::sync::Arc;

use chrono::Utc;
use ethistyle::{
    application::startup::app,
    application::telemetry::{get_subscriber, init_subscriber},
    configuration::{get_config, DatabaseSettings},
    domain::AppState,
};
use once_cell::sync::Lazy;
use secrecy::Secret;
use sqlx::{Connection, Executor, PgConnection, PgPool};
use tokio::net::TcpListener;
use uuid::Uuid;

use super::mock_hasher::MockHasher;

pub struct TestApp {
    pub address: String,
    pub app_state: Arc<AppState>,
}

static TRACING: Lazy<()> = Lazy::new(|| {
    let default_filter_level = "info";
    let subscriber_name = "test";
    if std::env::var("TEST_LOG").is_ok() {
        let subscriber = get_subscriber(subscriber_name, default_filter_level, std::io::stdout);
        init_subscriber(subscriber);
    } else {
        let subscriber = get_subscriber(subscriber_name, default_filter_level, std::io::sink);
        init_subscriber(subscriber);
    };
});

pub async fn spawn_app() -> TestApp {
    Lazy::force(&TRACING);
    let listener = TcpListener::bind("0.0.0.0:0").await.unwrap();
    let address = format!("http://127.0.0.1:{}", listener.local_addr().unwrap().port());

    let mut config = get_config().expect("Could not read settings");
    config.database.name = Uuid::new_v4().to_string();
    let pg_pool = configure_database(&config.database).await;

    let app_state = AppState {
        db: pg_pool,
        hasher: Arc::new(MockHasher::new()),
        jwt_secret: Secret::new("secret".to_string()),
    };
    let shared_state = Arc::new(app_state);

    let tmp = shared_state.clone();
    tokio::spawn(async move {
        axum::serve(listener, app(&tmp)).await.unwrap();
    });
    TestApp {
        address,
        app_state: shared_state,
    }
}

async fn configure_database(config: &DatabaseSettings) -> PgPool {
    let mut connection = PgConnection::connect_with(&config.without_db())
        .await
        .expect("Could not connect to Postgres");
    connection
        .execute(format!(r#"CREATE DATABASE "{}";"#, config.name).as_str())
        .await
        .expect("Failed to create the database");

    let pg_pool = PgPool::connect_with(config.with_db())
        .await
        .expect("Failed to connect to the database");
    sqlx::migrate!("./migrations")
        .run(&pg_pool)
        .await
        .expect("Failed to migrate the db");
    pg_pool
}

#[allow(clippy::module_name_repetitions)]
pub async fn spawn_app_with_user() -> TestApp {
    let app = spawn_app().await;
    let hash = app.app_state.hasher.hash_password("password").unwrap();

    sqlx::query!(
        r#"
            INSERT INTO Users (id, email, username, password_hash, subscribed_at)
            VALUES ($1, $2, $3, $4, $5)
        "#,
        Uuid::new_v4(),
        "m.hamilton@nasa.gov",
        "Margaret Hamilton",
        hash,
        Utc::now(),
    )
    .execute(&app.app_state.db)
    .await
    .expect("Failed to insert user into db");
    app
}

#[allow(clippy::module_name_repetitions)]
pub async fn spawn_app_with_logged_user() -> (TestApp, String) {
    let test_app = spawn_app_with_user().await;
    let client = reqwest::Client::new();
    let body = "email=m.hamilton@nasa.gov&password=password";

    let response = client
        .post(&format!("{}/get_jwt", &test_app.address))
        .header("Content-Type", "application/x-www-form-urlencoded")
        .body(body)
        .send()
        .await
        .expect("Failed to execute request.");
    assert!(response.status().is_success(), "Failed to login user");
    (test_app, response.text().await.unwrap())
}
