use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct UpdateItemSchema {
    pub name: Option<String>,
    pub price: Option<f64>,
    pub description: Option<String>,
    pub tags: Option<Vec<String>>,
    pub is_sold: Option<bool>,
}
