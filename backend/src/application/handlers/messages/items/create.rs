use std::sync::Arc;

use axum::{extract::State, http::StatusCode, response::IntoResponse, Extension, Json};
use serde_json::json;
use uuid::Uuid;

use crate::domain::{user::CurrentUser, AppState, CreateItemSchema};

#[tracing::instrument(name = "Create an Item", skip(app_state, current_user))]
/// # Errors
/// Will return `StatusCode::INTERNAL_SERVER_ERROR` if the query fails
pub async fn create(
    State(app_state): State<Arc<AppState>>,
    Extension(current_user): Extension<CurrentUser>,
    Json(create_schema): Json<CreateItemSchema>,
) -> Result<impl IntoResponse, (StatusCode, Json<serde_json::Value>)> {
    let new_item_id = Uuid::new_v4();

    sqlx::query!(
        r#"INSERT INTO
            Items  (id, seller_id, name, price, description, date_added)
            VALUES ($1, $2       , $3  , $4   , $5         , $6        )
        "#,
        new_item_id,
        current_user.id,
        create_schema.name.to_string(),
        create_schema.price,
        create_schema.description.to_string(),
        chrono::Utc::now(),
    )
    .execute(&app_state.db)
    .await
    .map_err(|err| {
        tracing::error!("Failed to execute query: {:?}", err);
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(json!({"status": "error","message": format!("{:?}", err.to_string())})),
        )
    })?;

    Ok((StatusCode::OK, Json(json!({"id": new_item_id}))))
}
