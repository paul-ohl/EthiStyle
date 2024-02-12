use std::{str::FromStr, sync::Arc};

use axum::{
    extract::Extension,
    http::{header, HeaderMap, StatusCode},
    routing::post,
    Json, Router,
};
use secrecy::{ExposeSecret, Secret};
use serde_json::Value;
use sqlx::PgPool;
use tracing::warn;
use uuid::Uuid;

use crate::domain::{
    jwt_claims::{JwtClaims, UserType},
    user, AppState,
};

pub fn endpoint(shared_state: &Arc<AppState>) -> Router {
    Router::new()
        .route("/get_jwt", post(get_jwt))
        .layer(Extension(shared_state.clone()))
}

#[derive(Debug, serde::Deserialize)]
struct FormData {
    email: String,
    password: String,
}

#[tracing::instrument(name = "Get a JWT", skip(app_state))]
async fn get_jwt(
    Extension(app_state): Extension<Arc<AppState>>,
    headers: HeaderMap,
    payload: Option<Json<Value>>,
) -> (StatusCode, String) {
    let user_infos = if let Some(auth_header) = headers.get(header::AUTHORIZATION) {
        let Ok(auth_header) = auth_header.to_str() else {
            return (StatusCode::BAD_REQUEST, "Invalid header".into());
        };
        if auth_header == "Bearer " {
            return (StatusCode::UNAUTHORIZED, "No token provided".into());
        }
        let Ok(jwt) = JwtClaims::decode(
            auth_header.trim_start_matches("Bearer "),
            &app_state.jwt_secret,
        ) else {
            return (StatusCode::BAD_REQUEST, "Invalid JWT formatting".into());
        };
        let Ok(user_infos) = get_user_infos_from_jwt(&jwt) else {
            return (StatusCode::BAD_REQUEST, "Invalid JWT".into());
        };
        user_infos
    } else if let Some(Json(payload)) = payload {
        match get_user_infos_from_json_payload(payload, &app_state).await {
            Ok(i) => i,
            Err(e) => match e {
                UserInfosError::BadRequest(message) => {
                    return (StatusCode::BAD_REQUEST, message);
                }
                UserInfosError::Unauthorized(message) => {
                    return (StatusCode::UNAUTHORIZED, message);
                }
                UserInfosError::InternalServerError(message) => {
                    return (StatusCode::INTERNAL_SERVER_ERROR, message);
                }
            },
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

enum UserInfosError {
    BadRequest(String),
    Unauthorized(String),
    InternalServerError(String),
}

fn get_user_infos_from_jwt(jwt: &JwtClaims) -> Result<UserInfos, UserInfosError> {
    let now = chrono::Utc::now().timestamp();

    if now > jwt.expires_at {
        return Err(UserInfosError::Unauthorized("Token expired".into()));
    }
    let id = Uuid::from_str(&jwt.user_id)
        .map_err(|_| UserInfosError::BadRequest("Invalid user_id in JWT".into()))?;
    let user_infos = UserInfos {
        id,
        username: jwt.user_name.clone(),
        email: jwt.user_email.clone(),
        password_hash: None,
    };
    Ok(user_infos)
}

async fn get_user_infos_from_json_payload(
    payload: Value,
    app_state: &Arc<AppState>,
) -> Result<UserInfos, UserInfosError> {
    let form: FormData = match serde_json::from_value(payload) {
        Ok(form) => form,
        Err(err) => {
            tracing::error!("Failed to parse input: {:?}", err);
            return Err(UserInfosError::BadRequest("Failed to parse input".into()));
        }
    };
    let user_credentials: user::LoginUserDto = match form.try_into() {
        Ok(user) => user,
        Err(error_message) => {
            tracing::error!(
                "email or password was formatted incorrectly: {:?}",
                error_message
            );
            return Err(UserInfosError::BadRequest(
                "email or password was formatted incorrectly".into(),
            ));
        }
    };
    let user_infos = match get_user_infos(&app_state.db, &user_credentials).await {
        Ok(i) => i,
        Err(e) => match e {
            sqlx::Error::RowNotFound => {
                tracing::error!("User not found");
                return Err(UserInfosError::Unauthorized("email was not found".into()));
            }
            _ => {
                return Err(UserInfosError::InternalServerError(
                    "Something went wrong".into(),
                ));
            }
        },
    };
    warn!("user_infos: {:?}", user_infos);
    if !app_state.hasher.verify(
        user_credentials.password.expose_secret(),
        user_infos
            .password_hash
            .as_ref()
            .expect("The password_hash field is None, this is a critical error")
            .expose_secret(),
    ) {
        warn!("password hashes do not match",);
        return Err(UserInfosError::Unauthorized("Invalid password".into()));
    }
    Ok(user_infos)
}

#[derive(Debug)]
struct UserInfos {
    id: Uuid,
    username: String,
    email: String,
    password_hash: Option<Secret<String>>,
}

#[tracing::instrument(
    name = "Fetching user infos from the database",
    skip(new_subscriber, pool)
)]
async fn get_user_infos(
    pool: &PgPool,
    new_subscriber: &user::LoginUserDto,
) -> Result<UserInfos, sqlx::Error> {
    let result = sqlx::query!(
        "SELECT id, username, email, password_hash from Users WHERE email = $1",
        new_subscriber.email.as_ref(),
    )
    .fetch_one(pool)
    .await
    .map_err(|err| {
        tracing::error!("Failed to fetch user: {:?}", err);
        err
    })?;

    Ok(UserInfos {
        id: result.id,
        username: result.username,
        email: result.email,
        password_hash: Some(Secret::new(result.password_hash)),
    })
}

impl TryFrom<FormData> for user::LoginUserDto {
    type Error = String;
    fn try_from(value: FormData) -> Result<Self, Self::Error> {
        let email = value.email; //.ok_or("email not provided")?;
        let password = value.password; //.ok_or("password not provided")?;
        let email = user::Email::parse(&email)?;
        let password = user::ClearPassword::parse(&password)?;
        Ok(Self { email, password })
    }
}
