use std::sync::Arc;

use axum::{http::StatusCode, middleware, routing::get, Router};

use crate::{application::middleware::jwt_auth, domain::AppState};

pub fn endpoint(app_state: &Arc<AppState>) -> Router {
    Router::new().route(
        "/protected_endpoint",
        get(protected_endpoint).route_layer(middleware::from_fn_with_state(
            app_state.clone(),
            jwt_auth::auth,
        )),
    )
}

pub async fn protected_endpoint() -> StatusCode {
    StatusCode::OK
}
