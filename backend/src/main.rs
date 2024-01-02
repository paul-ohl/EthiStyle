#![warn(clippy::perf, clippy::pedantic)]

use ethistyle::{
    configuration::get_config,
    startup::run,
    telemetry::{get_subscriber, init_subscriber},
};
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

    let address = format!(
        "{}:{}",
        configuration.application.host, configuration.application.port
    );
    let listener = TcpListener::bind(address.clone())
        .await
        .expect("Could not bind on port");

    tracing::info!("app launched, listening on {}", address);
    run(listener, pg_pool).await.unwrap();
}
