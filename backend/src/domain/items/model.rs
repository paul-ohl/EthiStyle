use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Deserialize, Serialize, sqlx::FromRow)]
#[allow(non_snake_case)]
pub struct ItemsModel {
    pub id: Uuid,
    pub seller_id: Uuid,
    pub name: String,
    pub price: f64,
    pub description: String,
    pub date_added: chrono::DateTime<chrono::Utc>,
    pub is_sold: bool,
}
