use std::sync::Arc;

use axum::{extract::Extension, http::StatusCode, routing::post, Json, Router};
use chrono::Utc;
use serde_json::Value;
use sqlx::PgPool;
use uuid::Uuid;

use crate::domain::{
    user::{self, RegisterUserDto},
    AppState, Hasher,
};

pub fn endpoint(shared_state: &Arc<AppState>) -> Router {
    Router::new()
        .route("/register", post(register))
        .layer(Extension(shared_state.clone()))
}

#[derive(serde::Deserialize)]
struct FormData {
    email: String,
    name: String,
    password: String,
}

#[tracing::instrument(name = "Registering a new user", skip(payload, app_state))]
async fn register(
    Extension(app_state): Extension<Arc<AppState>>,
    Json(payload): Json<Value>,
) -> StatusCode {
    let form: FormData = match serde_json::from_value(payload) {
        Ok(form) => form,
        Err(err) => {
            tracing::error!("Failed to parse input: {:?}", err);
            return StatusCode::BAD_REQUEST;
        }
    };
    let new_user_credentials = match form.convert_to_user_dto(app_state.hasher.clone()) {
        Ok(new_user) => new_user,
        Err(error_message) => {
            tracing::error!("Failed to parse register details: {:?}", error_message);
            return StatusCode::BAD_REQUEST;
        }
    };
    if save_user(&app_state.db, &new_user_credentials)
        .await
        .is_ok()
    {
        StatusCode::OK
    } else {
        StatusCode::INTERNAL_SERVER_ERROR
    }
}

impl FormData {
    #[allow(clippy::needless_pass_by_value)] // I am not talented enough to remove this allow
    fn convert_to_user_dto(&self, hasher: Arc<dyn Hasher>) -> Result<RegisterUserDto, String> {
        let username = user::Name::parse(&self.name)?;
        let email = user::Email::parse(&self.email)?;
        let hash = user::PasswordHash::hash_string(&self.password, hasher)?;
        Ok(RegisterUserDto {
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
        new_subscriber.hash.expose_secret(),
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
