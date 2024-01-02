use axum::{http::StatusCode, routing::get, Router};

pub fn endpoint() -> Router {
    Router::new().route("/protected_endpoint", get(protected_endpoint))
}

pub async fn protected_endpoint() -> StatusCode {
    StatusCode::OK
}
