#![warn(clippy::perf, clippy::pedantic)]

use std::sync::Arc;

use ethistyle::{
    application::startup::run,
    application::{
        telemetry::{get_subscriber, init_subscriber},
        ArgonHasher,
    },
    configuration::get_config,
    domain::AppState,
};
use secrecy::Secret;
use sqlx::postgres::PgPoolOptions;
use tokio::net::TcpListener;

#[tokio::main]
async fn main() {
    // setup telemetry
    let subscriber = get_subscriber("ethistyle", "info", std::io::stdout);
    init_subscriber(subscriber);

    let configuration = get_config().expect("Could not read configuration");
    let pg_pool = PgPoolOptions::new()
        .acquire_timeout(std::time::Duration::from_secs(3))
        .connect_lazy_with(configuration.database.with_db());

    let app_state = AppState {
        db: pg_pool,
        hasher: Arc::new(ArgonHasher::new()),
        jwt_secret: Secret::new(configuration.jwt_secret),
    };

    let address = format!(
        "{}:{}",
        configuration.application.host, configuration.application.port
    );
    let listener = TcpListener::bind(address.clone())
        .await
        .expect("Could not bind on port");

    tracing::info!("app launched, listening on {}", address);
    run(listener, app_state)
        .await
        .expect("Failed to run the app");
}
