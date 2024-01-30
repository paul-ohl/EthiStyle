use std::sync::Arc;

use axum::{
    extract::{Extension, Form},
    http::StatusCode,
    response::IntoResponse,
    routing::post,
    Router,
};
use jwt_encoder::encode_jwt;
use secrecy::{ExposeSecret, Secret};
use sqlx::PgPool;

use crate::domain::{
    jwt::{jwt_encoder, Claims, UserType},
    user, AppState,
};

pub fn endpoint(shared_state: &Arc<AppState>) -> Router {
    Router::new()
        .route("/login", post(login))
        .layer(Extension(shared_state.clone()))
}

#[derive(serde::Deserialize)]
struct FormData {
    email: String,
    password: String,
}

#[tracing::instrument(
    name = "Login a user"
    skip(form, app_state),
    fields(
        form.email,
    )
)]
async fn login(
    Extension(app_state): Extension<Arc<AppState>>,
    Form(form): Form<FormData>,
) -> (StatusCode, String) {
    let user_credentials: user::LoginUserDto = match form.try_into() {
        Ok(user) => user,
        Err(error_message) => {
            tracing::error!(
                "email or password was formatted incorrectly: {:?}",
                error_message
            );
            return (
                StatusCode::BAD_REQUEST,
                "email or password was formatted incorrectly".into(),
            );
        }
    };
    let user_infos = match get_user_infos(&app_state.db, &user_credentials).await {
        Ok(hash) => hash,
        Err(e) => match e {
            sqlx::Error::RowNotFound => {
                tracing::error!("User not found");
                return (StatusCode::UNAUTHORIZED, "email was not found".into());
            }
            _ => {
                return (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    "Something went wrong".into(),
                )
            }
        },
    };
    let is_password_correct = app_state.hasher.verify(
        user_credentials.password.expose_secret(),
        user_infos.password_hash.expose_secret(),
    );
    let jwt_claims = Claims::builder()
        .user_type(UserType::User)
        .user_name(user_infos.username)
        .user_email(user_infos.email);
    if let Ok(jwt) = encode_jwt(&jwt_claims.build(), app_state.jwt_secret.expose_secret()) {
        (StatusCode::OK, jwt)
    } else {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            "Failed encoding the JWT".into(),
        )
    }
}

struct UserInfos {
    username: String,
    email: String,
    password_hash: Secret<String>,
}

#[tracing::instrument(
    name = "Saving new subscriber details in the database",
    skip(new_subscriber, pool)
)]
async fn get_user_infos(
    pool: &PgPool,
    new_subscriber: &user::LoginUserDto,
) -> Result<UserInfos, sqlx::Error> {
    let result = sqlx::query!(
        "SELECT username, email, password_hash from Users WHERE email = $1",
        new_subscriber.email.as_ref(),
    )
    .fetch_one(pool)
    .await
    .map_err(|err| {
        tracing::error!("Failed to fetch user: {:?}", err);
        err
    })?;

    Ok(UserInfos {
        username: result.username,
        email: result.email,
        password_hash: Secret::new(result.password_hash),
    })
}

impl TryFrom<FormData> for user::LoginUserDto {
    type Error = String;
    fn try_from(value: FormData) -> Result<Self, Self::Error> {
        let email = user::Email::parse(&value.email)?;
        let password = user::ClearPassword::parse(&value.password)?;
        Ok(Self { email, password })
    }
}
