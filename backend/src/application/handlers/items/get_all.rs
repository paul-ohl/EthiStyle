use std::sync::Arc;

use axum::{
    extract::{Query, State},
    http::StatusCode,
    response::IntoResponse,
    Json,
};

use crate::domain::{AppState, FilterOptions, ItemsModel};

/// # Errors
/// Will return `StatusCode::INTERNAL_SERVER_ERROR` if the query fails
/// Will return `StatusCode::BAD_REQUEST` if the query parameter is invalid
/// Will return `StatusCode::NOT_FOUND` if no items are found
pub async fn get_all(
    opts: Option<Query<FilterOptions>>,
    State(data): State<Arc<AppState>>,
) -> Result<impl IntoResponse, (StatusCode, Json<serde_json::Value>)> {
    let Query(opts) = opts.unwrap_or_default();

    let limit = opts.limit.unwrap_or(20);
    let offset = opts.offset.unwrap_or(0);

    #[allow(clippy::cast_possible_truncation, clippy::cast_possible_wrap)]
    let items = sqlx::query_as!(
        ItemsModel,
        r#"SELECT * FROM Items ORDER by id LIMIT $1 OFFSET $2"#,
        limit as i64,
        offset as i64
    )
    .fetch_all(&data.db)
    .await
    .map_err(|e| {
        let error_response = serde_json::json!({
            "status": "fail",
            "message": format!("Database error: {}", e),
        });
        (StatusCode::INTERNAL_SERVER_ERROR, Json(error_response))
    })?;

    let json_response = serde_json::json!({
        "status": "success",
        "length": items.len(),
        "data": items
    });

    Ok(Json(json_response))
}
