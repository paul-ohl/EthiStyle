use std::sync::Arc;

use axum::{
    middleware,
    routing::{get, post},
    Router,
};

use crate::{
    application::{
        handlers::items::{create, delete, edit, get_all, get_one},
        middleware::jwt_auth,
    },
    domain::AppState,
};

pub fn endpoints(app_state: &Arc<AppState>) -> Router {
    Router::new()
        .route("/items", get(get_all))
        .route("/items", post(create))
        .route_layer(middleware::from_fn_with_state(
            app_state.clone(),
            jwt_auth::auth,
        ))
        .route("/items/:id", get(get_one).patch(edit).delete(delete))
        .with_state(app_state.clone())
}
