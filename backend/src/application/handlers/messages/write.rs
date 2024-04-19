use std::sync::Arc;

use axum::{
    extract::{Path, State},
    http::StatusCode,
    response::IntoResponse,
    Extension, Json,
};
use serde::Deserialize;
use serde_json::{json, Value};
use uuid::Uuid;

use crate::domain::{user::CurrentUser, AppState};

#[derive(Debug, Deserialize)]
pub struct MessageContent {
    content: String,
}

/// # Errors
/// Will return `StatusCode::INTERNAL_SERVER_ERROR` if the query fails
#[tracing::instrument(name = "Write a new message", skip(app_state, current_user))]
pub async fn write(
    Path(receiver_id): Path<String>,
    Extension(current_user): Extension<CurrentUser>,
    State(app_state): State<Arc<AppState>>,
    Json(content): Json<MessageContent>,
) -> Result<impl IntoResponse, (StatusCode, Json<Value>)> {
    let receiver_id = Uuid::parse_str(receiver_id.trim()).map_err(|_e| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(json!({"status": "error","message": "Failed to read username"})),
        )
    })?;
    if receiver_id == current_user.id {
        return Ok((
            StatusCode::BAD_REQUEST,
            Json(json!({"status": "error","message": "You cannot send a message to yourself"})),
        ));
    }
    if content.content.is_empty() {
        return Ok((
            StatusCode::BAD_REQUEST,
            Json(json!({"status": "error","message": "Message cannot be empty"})),
        ));
    }

    let new_message_id = Uuid::new_v4();
    sqlx::query!(
        r#"INSERT INTO
            Messages (id, sender_id, receiver_id, date_sent, content)
            VALUES   ($1, $2       , $3         , $4       , $5     )
        "#,
        new_message_id,
        current_user.id,
        receiver_id,
        chrono::Utc::now(),
        content.content,
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

    // Ok((StatusCode::OK, Json(json!({"id": new_message_id}))))
    Ok(((StatusCode::OK), Json(json!({"id": 0}))))
}
