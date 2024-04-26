use std::sync::Arc;

use axum::{
    extract::State,
    http::{header, HeaderMap, HeaderValue, StatusCode},
};
use secrecy::ExposeSecret;
use uuid::Uuid;

use crate::domain::{
    jwt_claims::{JwtClaims, UserType},
    AppState,
};

#[tracing::instrument(name = "Refresh a JWT", skip(app_state))]
pub async fn refresh_jwt(
    State(app_state): State<Arc<AppState>>,
    headers: HeaderMap,
) -> (StatusCode, String) {
    let user_infos = if let Some(auth_header) = headers.get(header::AUTHORIZATION) {
        let Ok(auth_header) = auth_header.to_str() else {
            return (StatusCode::BAD_REQUEST, "Invalid header".to_string());
        };
        if auth_header == "Bearer " {
            return (StatusCode::UNAUTHORIZED, "No token provided".to_string());
        }
        let Ok(jwt) = JwtClaims::decode(
            auth_header.trim_start_matches("Bearer "),
            &app_state.jwt_secret,
        ) else {
            return (
                StatusCode::BAD_REQUEST,
                "Invalid JWT formatting".to_string(),
            );
        };

        let now = chrono::Utc::now().timestamp();
        if now > jwt.expires_at {
            return (StatusCode::UNAUTHORIZED, "Token expired".to_string());
        }
        UserInfos {
            id: jwt.user_id,
            username: jwt.user_name,
            email: jwt.user_email,
        }
    } else {
        return (
            StatusCode::BAD_REQUEST,
            "No payload or authorization header provided".into(),
        );
    };

    let jwt_claims = JwtClaims::builder()
        .user_id(user_infos.id)
        .user_type(UserType::User)
        .user_name(user_infos.username)
        .user_email(user_infos.email)
        .build();
    jwt_claims
        .encode(app_state.jwt_secret.expose_secret())
        .map_or_else(
            |_| {
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    "Failed encoding the JWT".into(),
                )
            },
            |jwt| (StatusCode::OK, jwt),
        )
}

#[derive(Debug)]
struct UserInfos {
    id: Uuid,
    username: String,
    email: String,
}
