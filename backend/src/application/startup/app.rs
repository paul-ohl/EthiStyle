use std::sync::Arc;

#[allow(unused_imports)]
use axum::{Extension, Router};
use tokio::net::TcpListener;
use tower::ServiceBuilder;
use tower_http::{
    request_id::MakeRequestUuid,
    trace::{DefaultMakeSpan, DefaultOnResponse, TraceLayer},
    ServiceBuilderExt,
};
use tracing::Level;

use crate::{
    application::routes::{
        health_check, protected_endpoint,
        user::{login, register},
    },
    domain::AppState,
};

/// Given a standard `TcpListener` and a valid `PgPool`, this function will initialize the axum server
///
/// # Errors
/// The `run` function will fail if the `TcpListener` can't bind to the given port
pub async fn run(listener: TcpListener, app_state: AppState) -> Result<(), std::io::Error> {
    let shared_state = Arc::new(app_state);
    axum::serve(listener, app(&shared_state)).await
}

/// Used to get the app's router
pub fn app(shared_state: &Arc<AppState>) -> Router {
    Router::new()
        .merge(health_check::endpoint())
        .merge(protected_endpoint::endpoint(shared_state))
        .merge(login::endpoint(shared_state))
        .merge(register::endpoint(shared_state))
        // .layer(Extension(shared_state))
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
