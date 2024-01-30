use chrono::Utc;
use jsonwebtoken::{Algorithm, EncodingKey, Header};
use secrecy::{ExposeSecret, Secret};
use tracing::warn;

#[derive(Debug, serde::Serialize, serde::Deserialize, PartialEq)]
pub enum UserType {
    // Unsigned,
    User,
    Admin,
}

#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct Claims {
    #[serde(rename = "iat")]
    pub issued_at: i64,

    #[serde(rename = "exp")]
    pub expires_at: i64,

    pub user_type: UserType,

    /// The folowing fields will be empty if `user_type` is `Unsigned`.
    #[serde(rename = "sub", skip_serializing_if = "Option::is_none")]
    pub user_id: Option<String>,

    #[serde(skip_serializing_if = "Option::is_none")]
    pub user_name: Option<String>,

    #[serde(skip_serializing_if = "Option::is_none")]
    pub user_email: Option<String>,
}

#[buildstructor::buildstructor]
impl Claims {
    #[builder(visibility = "pub")]
    fn new(
        user_type: UserType,
        user_id: Option<String>,
        user_name: Option<String>,
        user_email: Option<String>,
    ) -> Self {
        let now = Utc::now();

        Self {
            /// The cast is safe because the timestamp is always positive.
            #[allow(clippy::cast_possible_truncation, clippy::cast_sign_loss)]
            issued_at: now.timestamp(),
            #[allow(clippy::cast_possible_truncation, clippy::cast_sign_loss)]
            expires_at: (now + chrono::Duration::minutes(30)).timestamp(),
            user_type,
            user_id,
            user_name,
            user_email,
        }
    }
}
