use axum::{
    extract::{Extension, Form},
    http::StatusCode,
    routing::post,
    Router,
};
use chrono::Utc;
use secrecy::ExposeSecret;
use sqlx::PgPool;
use uuid::Uuid;

use crate::domain::user;

pub fn endpoint() -> Router {
    Router::new().route("/register", post(register))
}

#[derive(serde::Deserialize)]
struct FormData {
    email: String,
    name: String,
    password: String,
}

#[tracing::instrument(
    name = "Registering a new user",
    skip(form, pool),
    fields(
        subscriber_email = %form.email,
        subscriber_name = %form.name
    )
)]
async fn register(Extension(pool): Extension<PgPool>, Form(form): Form<FormData>) -> StatusCode {
    let new_user_credentials = match form.try_into() {
        Ok(new_user) => new_user,
        Err(error_message) => {
            tracing::error!("Failed to parse register details: {:?}", error_message);
            return StatusCode::BAD_REQUEST;
        }
    };
    if save_user(&pool, &new_user_credentials).await.is_ok() {
        StatusCode::OK
    } else {
        StatusCode::INTERNAL_SERVER_ERROR
    }
}

impl TryFrom<FormData> for user::RegisterUserDto {
    type Error = String;
    fn try_from(value: FormData) -> Result<Self, Self::Error> {
        let username = user::Name::parse(&value.name)?;
        let email = user::Email::parse(&value.email)?;
        let hash = user::PasswordHash::parse(&value.password)?;
        Ok(Self {
            email,
            username,
            hash,
        })
    }
}

#[tracing::instrument(
    name = "Saving new subscriber details in the database",
    skip(new_subscriber, pool)
)]
async fn save_user(
    pool: &PgPool,
    new_subscriber: &user::RegisterUserDto,
) -> Result<(), sqlx::Error> {
    sqlx::query!(
        r#"
        INSERT INTO Users (id, email, username, password_hash, subscribed_at)
        VALUES ($1, $2, $3, $4, $5)
        "#,
        Uuid::new_v4(),
        new_subscriber.email.as_ref(),
        new_subscriber.username.as_ref(),
        new_subscriber.hash.get_hash().expose_secret(),
        Utc::now(),
    )
    .execute(pool)
    .await
    .map_err(|err| {
        tracing::error!("Failed to execute query: {:?}", err);
        err
    })?;

    Ok(())
}
