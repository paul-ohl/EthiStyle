use std::sync::Arc;

use axum::{
    extract::{Path, State},
    http::StatusCode,
    response::IntoResponse,
    Json,
};
use serde_json::json;

use crate::domain::{AppState, ItemsModel, UpdateItemSchema};

pub async fn edit(
    Path(id): Path<uuid::Uuid>,
    State(data): State<Arc<AppState>>,
    Json(body): Json<UpdateItemSchema>,
) -> Result<impl IntoResponse, (StatusCode, Json<serde_json::Value>)> {
    let query_result = sqlx::query_as!(ItemsModel, r#"SELECT * FROM Items WHERE id = $1"#, id)
        .fetch_one(&data.db)
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

    let update_result = sqlx::query(
        r"UPDATE Items SET name = ?, description = ?, price = ?, is_sold = ? WHERE id = ?",
    )
    .bind(body.name.to_owned().unwrap_or_else(|| item.name))
    .bind(
        body.description
            .to_owned()
            .unwrap_or_else(|| item.description),
    )
    .bind(body.price.to_owned().unwrap_or_else(|| item.price))
    .bind(body.is_sold.to_owned().unwrap_or_else(|| item.is_sold))
    .bind(id.to_string())
    .execute(&data.db)
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
            "message": format!("Note with ID: {} not found", id)
        });
        return Err((StatusCode::NOT_FOUND, Json(error_response)));
    }

    let note_response = serde_json::json!({
        "status": "success",
        "data": {
            "id": id
        }
    });

    Ok(Json(note_response))
}
