use chrono::Utc;
use jsonwebtoken::{Algorithm, Header};
use secrecy::Secret;
use serde::{Deserialize, Serialize};

struct Jwt {
    header: Header,
    payload: Claim,
    secret: Secret<String>,
}

#[derive(Debug, Serialize, Deserialize)]
struct Claim {
    exp: usize,
    user_type: UserType,
    user_id: Option<String>, // The id is empty for unsigned users
}

#[derive(Debug, Serialize, Deserialize)]
enum UserType {
    Admin,
    User,
    Unsigned,
}

impl Jwt {
    fn new(user_id: Option<String>) -> Self {
        let header = Header {
            alg: Algorithm::HS512,
            ..Default::default()
        };
        let user_type = if user_id.is_some() {
            UserType::User
        } else {
            UserType::Unsigned
        };
        let payload = Claim {
            // We know that the timestamp is a positive value
            #[allow(clippy::cast_sign_loss, clippy::cast_possible_truncation)]
            exp: Utc::now().timestamp() as usize + 1000 * 60 * 30, // 30 minutes
            user_type,
            user_id,
        };
        let secret = Secret::new("secret".to_string());
        Self {
            header,
            payload,
            secret,
        }
    }
}
