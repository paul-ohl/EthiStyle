use axum::{http::StatusCode, routing::get, Router};

pub fn endpoint() -> Router {
    Router::new()
        .route("/health_check", get(health_check))
        .route("/", get(health_check))
}

async fn health_check() -> StatusCode {
    StatusCode::OK
}
