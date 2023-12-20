use std::{marker::PhantomPinned, sync::Arc};

use axum::{
    routing::{get, post},
    Extension, Router,
};
use sqlx::PgPool;
use tokio::net::TcpListener;

use crate::routes::{health_check, subscribe};

/// Given a standard `TcpListener`, this function will initialize the axum server
///
/// # Errors
/// The `run` function will fail if the `TcpListener` can't bind to the given port
pub async fn run(listener: TcpListener, db_pool: PgPool) -> Result<(), std::io::Error> {
    axum::serve(listener, app(db_pool)).await
}

/// Used to get the app's router
pub fn app(db_pool: PgPool) -> Router {
    Router::new()
        .route("/health_check", get(health_check))
        .route("/subscription", post(subscribe))
        .layer(Extension(db_pool))
}
