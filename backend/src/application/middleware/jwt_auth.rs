use std::sync::Arc;

use axum::{
    body::Body,
    extract::State,
    http::{header, HeaderMap, Request, StatusCode},
    middleware::Next,
    response::IntoResponse,
    Json,
};

use serde::Serialize;
use sqlx::types::chrono;
use tracing::info;

use crate::domain::{jwt_claims::JwtClaims, AppState};

#[derive(Debug, Serialize)]
pub struct ErrorResponse {
    pub status: &'static str,
    pub message: String,
}

/// # Errors
/// Will return `StatusCode::NO_CONTENT` if no token is provided
/// Will return `StatusCode::UNAUTHORIZED` if token is invalid
/// Will return `StatusCode::UNAUTHORIZED` if token is expired
#[tracing::instrument(name = "Verify JWT middleware", skip(app_state, next))]
pub async fn auth(
    State(app_state): State<Arc<AppState>>,
    req: Request<Body>,
    next: Next,
) -> Result<impl IntoResponse, (StatusCode, Json<ErrorResponse>)> {
    let token = get_jwt_header(req.headers()).ok_or_else(|| {
        let json_error = ErrorResponse {
            status: "fail",
            message: "You are not logged in, please provide token".to_string(),
        };
        info!("No token was provided");
        (StatusCode::NO_CONTENT, Json(json_error))
    })?;

    let claims = JwtClaims::decode(&token, &app_state.jwt_secret).map_err(|_| {
        let json_error = ErrorResponse {
            status: "fail",
            message: "Invalid token".to_string(),
        };
        info!("Token ({:?}) invalid", token);
        (StatusCode::UNAUTHORIZED, Json(json_error))
    })?;

    let now = chrono::Utc::now().timestamp();

    if now > claims.expires_at {
        let json_error = ErrorResponse {
            status: "fail",
            message: "Token expired".to_string(),
        };
        info!("Token ({:?}) expired", token);
        return Err((StatusCode::UNAUTHORIZED, Json(json_error)));
    }

    Ok(next.run(req).await)
}

fn get_jwt_header(headers: &HeaderMap) -> Option<String> {
    headers
        .get(header::AUTHORIZATION)
        .and_then(|auth_header| auth_header.to_str().ok())
        .and_then(|auth_value| {
            auth_value
                .strip_prefix("Bearer ")
                .map(std::string::ToString::to_string)
        })
}
