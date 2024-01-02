use ethistyle::{
    configuration::{get_config, DatabaseSettings},
    startup::app,
    telemetry::{get_subscriber, init_subscriber},
};
use once_cell::sync::Lazy;
use sqlx::{Connection, Executor, PgConnection, PgPool};
use tokio::net::TcpListener;
use uuid::Uuid;

pub struct TestApp {
    pub address: String,
    pub pg_pool: PgPool,
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

    let pg_pool_clone = pg_pool.clone();
    tokio::spawn(async move {
        axum::serve(listener, app(pg_pool_clone)).await.unwrap();
    });
    TestApp { address, pg_pool }
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
