#![warn(clippy::perf)]

use secrecy::ExposeSecret;
use sqlx::postgres::PgPoolOptions;
use tokio::net::TcpListener;
use zero2prod::{
    configuration::get_config,
    startup::run,
    telemetry::{get_subscriber, init_subscriber},
};

#[tokio::main]
async fn main() {
    // setup telemetry
    let subscriber = get_subscriber("zero2prod", "info", std::io::stdout);
    init_subscriber(subscriber);

    let configuration = get_config().expect("Could not read configuration");
    let pg_pool = PgPoolOptions::new()
        .acquire_timeout(std::time::Duration::from_secs(3))
        .connect_lazy(configuration.database.connection_string().expose_secret())
        .expect("Could not connect to database");

    let address = format!(
        "{}:{}",
        configuration.application.host, configuration.application.port
    );
    let listener = TcpListener::bind(address.clone())
        .await
        .expect("Could not bind on port");

    log::info!("app launched, listening on {}", address);
    run(listener, pg_pool).await.unwrap();
}
