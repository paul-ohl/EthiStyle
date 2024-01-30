use std::sync::Arc;

use super::hasher::Hasher;
use secrecy::Secret;
use sqlx::PgPool;

pub struct AppState {
    pub db: PgPool, // This will change to a trait in the future
    pub hasher: Arc<dyn Hasher + Send + Sync>,
    pub jwt_secret: Secret<String>,
}
