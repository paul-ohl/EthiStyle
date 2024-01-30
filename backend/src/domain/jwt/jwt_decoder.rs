use axum::{http::StatusCode, Json};
use jsonwebtoken::{decode, DecodingKey, Validation};
use secrecy::{ExposeSecret, Secret};

use crate::application::middleware::ErrorResponse;

use super::Claims;

/// # Errors
/// Returns an error if the provided claims cannot be encoded as a JWT.
pub fn decode_jwt(
    token: &str,
    jwt_secret: &Secret<String>,
) -> Result<Claims, jsonwebtoken::errors::Error> {
    let claims = decode::<Claims>(
        token,
        &DecodingKey::from_secret(jwt_secret.expose_secret().as_ref()),
        &Validation::default(),
    )?
    .claims;
    Ok(claims)
}
