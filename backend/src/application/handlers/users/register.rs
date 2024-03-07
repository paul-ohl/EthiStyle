use std::sync::Arc;

use axum::{
    extract::{Extension, Form},
    http::StatusCode,
};
use chrono::Utc;
use sqlx::PgPool;
use uuid::Uuid;
use validator::Validate;

use crate::domain::{
    user::{self, RegisterUserDto},
    AppState, Hasher,
};

#[derive(serde::Deserialize)]
pub struct FormData {
    email: String,
    name: String,
    password: String,
}

#[tracing::instrument(
    name = "Registering a new user",
    skip(form, app_state),
    fields(
        subscriber_email = %form.email,
        subscriber_name = %form.name
    )
)]
pub async fn register(
    Extension(app_state): Extension<Arc<AppState>>,
    Form(form): Form<FormData>,
) -> StatusCode {
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
        let hash = user::PasswordHash::hash_string(&self.password, hasher)?;
        let dto = RegisterUserDto {
            email: self.email.clone(),
            username: self.name.clone(),
            hash,
        };
        dto.validate().map_err(|e| e.to_string())?;
        Ok(dto)
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
        new_subscriber.email,
        new_subscriber.username,
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
