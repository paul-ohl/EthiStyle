use super::Claims;

/// # Errors
/// Returns an error if the provided claims cannot be encoded as a JWT.
pub fn encode_jwt(claims: &Claims, secret: &str) -> Result<String, String> {
    let token = jsonwebtoken::encode(
        &jsonwebtoken::Header::default(),
        &claims,
        &jsonwebtoken::EncodingKey::from_secret(secret.as_ref()),
    )
    .map_err(|e| format!("Failed to encode claims: {e}"))?;
    Ok(token)
}
