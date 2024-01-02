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
    Router::new().route("/login", post(login))
}

#[derive(serde::Deserialize)]
struct FormData {
    email: String,
    password: String,
}

#[tracing::instrument(
    name = "Login a user"
    skip(form, pool),
    fields(
        // Which fields???
    )
)]
async fn login(Extension(pool): Extension<PgPool>, Form(form): Form<FormData>) -> StatusCode {
    let user_credentials = match form.try_into() {
        Ok(user) => user,
        Err(error_message) => {
            tracing::error!(
                "email or password was formatted incorrectly: {:?}",
                error_message
            );
            return StatusCode::BAD_REQUEST;
        }
    };
    if let Ok(_user) = authenticate_user(&pool, &user_credentials).await {
        // Create a new JWT for that user
        StatusCode::OK
    } else {
        StatusCode::INTERNAL_SERVER_ERROR
    }
}

impl TryFrom<FormData> for user::LoginUserDto {
    type Error = String;
    fn try_from(value: FormData) -> Result<Self, Self::Error> {
        let email = user::Email::parse(&value.email)?;
        let hash = user::PasswordHash::parse(&value.password)?;
        Ok(Self { email, hash })
    }
}

#[tracing::instrument(
    name = "Saving new subscriber details in the database",
    skip(new_subscriber, pool)
)]
async fn authenticate_user(
    pool: &PgPool,
    new_subscriber: &user::LoginUserDto,
) -> Result<(), sqlx::Error> {
    // sqlx::query!(
    //     r#"
    //     INSERT INTO Users (id, email, username, password_hash, subscribed_at)
    //     VALUES ($1, $2, $3, $4, $5)
    //     "#,
    //     Uuid::new_v4(),
    //     new_subscriber.email.as_ref(),
    //     new_subscriber.hash.get_hash().expose_secret(),
    //     Utc::now(),
    // )
    // .execute(pool)
    // .await
    // .map_err(|err| {
    //     tracing::error!("Failed to execute query: {:?}", err);
    //     err
    // })?;

    Ok(())
}
