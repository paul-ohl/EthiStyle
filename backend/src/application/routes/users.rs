use std::sync::Arc;

use axum::{routing::post, Router};

use crate::{
    application::handlers::users::{get_jwt, refresh_jwt, register},
    domain::AppState,
};

pub fn user_routes(shared_state: &Arc<AppState>) -> Router {
    Router::new()
        .route("/register", post(register))
        .route("/get_jwt", post(get_jwt))
        .route("/refresh_jwt", post(refresh_jwt))
        // .route("/logout", post(logout))
        .with_state(shared_state.clone())
}
