use std::sync::Arc;

use axum::{
    extract::{Path, State},
    http::StatusCode,
    response::IntoResponse,
    Json,
};
use serde_json::json;

use crate::domain::{AppState, ItemsModel, UpdateItemSchema};

/// # Errors
/// Will return `StatusCode::INTERNAL_SERVER_ERROR` if the query fails
/// Will return `StatusCode::BAD_REQUEST` if the query parameter is invalid
pub async fn edit(
    Path(id): Path<uuid::Uuid>,
    State(app_state): State<Arc<AppState>>,
    Json(body): Json<UpdateItemSchema>,
) -> Result<impl IntoResponse, (StatusCode, Json<serde_json::Value>)> {
    let query_result = sqlx::query_as!(ItemsModel, r#"SELECT * FROM Items WHERE id = $1"#, id)
        .fetch_one(&app_state.db)
        .await;

    let item = match query_result {
        Ok(i) => i,
        Err(sqlx::Error::RowNotFound) => {
            let error_response = serde_json::json!({
                "status": "fail",
                "message": format!("Item with ID: {} not found", id)
            });
            return Err((StatusCode::NOT_FOUND, Json(error_response)));
        }
        Err(e) => {
            return Err((
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({"status": "error","message": format!("{:?}", e)})),
            ));
        }
    };

    let update_result = sqlx::query!(
        r"UPDATE Items
            SET name = $1, description = $2, price = $3, is_sold = $4
            WHERE id = $5
        ",
        body.name.clone().unwrap_or(item.name),
        body.description.clone().unwrap_or(item.description),
        body.price.unwrap_or(item.price),
        body.is_sold.unwrap_or(item.is_sold),
        id,
    )
    .execute(&app_state.db)
    .await
    .map_err(|e| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(json!({"status": "error","message": format!("{:?}", e)})),
        )
    })?;

    if update_result.rows_affected() == 0 {
        let error_response = serde_json::json!({
            "status": "fail",
            "message": format!("Item with ID: {} not found", id)
        });
        return Err((StatusCode::NOT_FOUND, Json(error_response)));
    }

    let item_response = serde_json::json!({
        "status": "success",
        "data": {
            "id": id
        }
    });

    Ok(Json(item_response))
}
