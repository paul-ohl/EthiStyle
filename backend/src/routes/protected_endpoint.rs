use axum::http::StatusCode;

pub async fn protected_endpoint() -> StatusCode {
    StatusCode::OK
}
