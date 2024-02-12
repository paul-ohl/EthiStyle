use chrono::Utc;
use jsonwebtoken::{decode, DecodingKey, Validation};
use secrecy::{ExposeSecret, Secret};
use uuid::Uuid;

#[derive(Debug, serde::Serialize, serde::Deserialize, PartialEq, Eq)]
pub enum UserType {
    // Unsigned,
    User,
    Admin,
}

#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct JwtClaims {
    #[serde(rename = "iat")]
    pub issued_at: i64,

    #[serde(rename = "exp")]
    pub expires_at: i64,

    pub user_type: UserType,

    #[serde(rename = "sub")]
    pub token_id: Uuid,

    /// The following fields will be empty if `user_type` is `Unsigned`.
    pub user_id: String,
    pub user_name: String,
    pub user_email: String,
}

#[buildstructor::buildstructor]
impl JwtClaims {
    #[builder(visibility = "pub")]
    fn new(user_type: UserType, user_id: String, user_name: String, user_email: String) -> Self {
        let now = Utc::now();

        Self {
            // The cast is safe because the timestamp is always positive.
            #[allow(clippy::cast_possible_truncation, clippy::cast_sign_loss)]
            issued_at: now.timestamp(),
            #[allow(clippy::cast_possible_truncation, clippy::cast_sign_loss)]
            expires_at: (now + chrono::Duration::minutes(30)).timestamp(),
            token_id: Uuid::new_v4(),
            user_type,
            user_id,
            user_name,
            user_email,
        }
    }
}

impl JwtClaims {
    /// # Errors
    /// Returns an error if the provided claims cannot be encoded as a JWT.
    pub fn encode(&self, secret: &str) -> Result<String, String> {
        let token = jsonwebtoken::encode(
            &jsonwebtoken::Header::default(),
            self,
            &jsonwebtoken::EncodingKey::from_secret(secret.as_ref()),
        )
        .map_err(|e| format!("Failed to encode claims: {e}"))?;
        Ok(token)
    }

    /// # Errors
    /// Returns an error if the provided claims cannot be encoded as a JWT.
    pub fn decode(
        token: &str,
        jwt_secret: &Secret<String>,
    ) -> Result<Self, jsonwebtoken::errors::Error> {
        let claims = decode::<Self>(
            token,
            &DecodingKey::from_secret(jwt_secret.expose_secret().as_ref()),
            &Validation::default(),
        )?
        .claims;
        Ok(claims)
    }
}
