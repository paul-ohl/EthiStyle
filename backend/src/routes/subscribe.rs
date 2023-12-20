use axum::{extract::State, http::StatusCode, Extension, Form};
use chrono::Utc;
use sqlx::PgPool;
use uuid::Uuid;

#[derive(serde::Deserialize)]
pub struct FormData {
    name: String,
    email: String,
}

pub async fn subscribe(
    Extension(pool): Extension<PgPool>,
    Form(form): Form<FormData>,
) -> StatusCode {
    let query_result = sqlx::query!(
        r#"
        INSERT INTO subscriptions (id, email, name, subscribed_at)
        VALUES ($1, $2, $3, $4)
        "#,
        Uuid::new_v4(),
        form.email,
        form.name,
        Utc::now(),
    )
    .execute(&pool)
    .await;
    match query_result {
        Ok(_) => StatusCode::OK,
        Err(err) => {
            println!("Failed to execute query: {err}");
            StatusCode::INTERNAL_SERVER_ERROR
        }
    }
}
