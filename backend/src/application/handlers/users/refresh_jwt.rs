use std::sync::Arc;

use axum::{
    extract::Extension,
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
    Extension(app_state): Extension<Arc<AppState>>,
    headers: HeaderMap,
) -> (StatusCode, String) {
    let user_infos = if let Some(auth_header) = headers.get(header::AUTHORIZATION) {
        let Ok(user_infos) = get_user_infos_from_auth_header(auth_header, &app_state) else {
            return (StatusCode::BAD_REQUEST, "Invalid JWT".into());
        };
        user_infos
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

enum UserInfosError {
    BadRequest(String),
    Unauthorized(String),
}

fn get_user_infos_from_auth_header(
    auth_header: &HeaderValue,
    app_state: &Arc<AppState>,
) -> Result<UserInfos, UserInfosError> {
    let Ok(auth_header) = auth_header.to_str() else {
        return Err(UserInfosError::BadRequest("Invalid header".into()));
    };
    if auth_header == "Bearer " {
        return Err(UserInfosError::Unauthorized("No token provided".into()));
    }
    let Ok(jwt) = JwtClaims::decode(
        auth_header.trim_start_matches("Bearer "),
        &app_state.jwt_secret,
    ) else {
        return Err(UserInfosError::BadRequest("Invalid JWT formatting".into()));
    };

    let now = chrono::Utc::now().timestamp();
    if now > jwt.expires_at {
        return Err(UserInfosError::Unauthorized("Token expired".into()));
    }
    let user_infos = UserInfos {
        id: jwt.user_id,
        username: jwt.user_name,
        email: jwt.user_email,
    };
    Ok(user_infos)
}

#[derive(Debug)]
struct UserInfos {
    id: Uuid,
    username: String,
    email: String,
}
