use axum::{
    routing::{get, post},
    Extension, Router,
};
use sqlx::PgPool;
use tokio::net::TcpListener;
use tower::ServiceBuilder;
use tower_http::{
    request_id::MakeRequestUuid,
    trace::{DefaultMakeSpan, DefaultOnResponse, TraceLayer},
    ServiceBuilderExt,
};
use tracing::Level;

use crate::application::routes::{
    health_check, protected_endpoint,
    user::{login, register},
};

/// Given a standard `TcpListener` and a valid `PgPool`, this function will initialize the axum server
///
/// # Errors
/// The `run` function will fail if the `TcpListener` can't bind to the given port
pub async fn run(listener: TcpListener, db_pool: PgPool) -> Result<(), std::io::Error> {
    axum::serve(listener, app(db_pool)).await
}

/// Used to get the app's router
pub fn app(db_pool: PgPool) -> Router {
    Router::new()
        .merge(login::endpoint())
        .merge(register::endpoint())
        .merge(health_check::endpoint())
        .merge(protected_endpoint::endpoint())
        .layer(Extension(db_pool))
        .layer(
            // from https://docs.rs/tower-http/0.2.5/tower_http/request_id/index.html#using-trace
            ServiceBuilder::new()
                .set_x_request_id(MakeRequestUuid)
                .layer(
                    TraceLayer::new_for_http()
                        .make_span_with(
                            DefaultMakeSpan::new()
                                .include_headers(true)
                                .level(Level::INFO),
                        )
                        .on_response(DefaultOnResponse::new().include_headers(true)),
                )
                .propagate_x_request_id(),
        )
}
