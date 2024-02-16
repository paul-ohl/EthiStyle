use std::sync::Arc;

use axum::{extract::State, http::StatusCode, response::IntoResponse, Extension, Json};
use serde_json::json;

use crate::domain::{user::CurrentUser, AppState, CreateItemSchema};

/// # Errors
/// Will return `StatusCode::INTERNAL_SERVER_ERROR` if the query fails
pub async fn create(
    State(app_state): State<Arc<AppState>>,
    Extension(current_user): Extension<CurrentUser>,
    Json(create_schema): Json<CreateItemSchema>,
) -> Result<impl IntoResponse, (StatusCode, Json<serde_json::Value>)> {
    let query_result = sqlx::query(
        r"INSERT INTO
        Items  (seller_id, name, price, description, date_added)
        VALUES (?,         ?,    ?,     ?,           ?)",
    )
    .bind(current_user.id.clone())
    .bind(create_schema.name.to_string())
    .bind(create_schema.price.to_string())
    .bind(create_schema.description.to_string())
    .bind(chrono::Utc::now())
    .execute(&app_state.db)
    .await
    .map_err(|err: sqlx::Error| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(json!({"status": "error","message": format!("{:?}", err.to_string())})),
        )
    })?;

    Ok((
        StatusCode::OK,
        Json(json!({"id": query_result.rows_affected()})),
    ))
}
