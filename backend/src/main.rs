#![warn(clippy::perf)]

use secrecy::ExposeSecret;
use sqlx::PgPool;
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
    let pg_pool = PgPool::connect(configuration.database.connection_string().expose_secret())
        .await
        .expect("Could not connect to database");
    let address = format!("127.0.0.1:{}", configuration.app_port);
    let listener = TcpListener::bind(address)
        .await
        .expect("Could not bind on port");

    run(listener, pg_pool).await.unwrap();
}
