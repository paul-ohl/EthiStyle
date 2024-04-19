use std::sync::Arc;

use axum::{
    middleware,
    routing::{delete, get},
    Router,
};

use crate::{
    application::{
        handlers::messages::{delete_conversation, get_all, write},
        middleware::jwt_auth,
    },
    domain::AppState,
};

pub fn endpoints(app_state: &Arc<AppState>) -> Router {
    Router::new()
        .route("/messages", get(get_all))
        // Maybe later... Editing and deleting sent messages
        // .route("/messages/:message_id", delete(delete_message).patch(edit))
        .route(
            "/messages/:user_id",
            delete(delete_conversation)
                // .get(get_from_user_id)
                .post(write),
        )
        .route_layer(middleware::from_fn_with_state(
            app_state.clone(),
            jwt_auth::auth,
        ))
        .with_state(app_state.clone())
}
