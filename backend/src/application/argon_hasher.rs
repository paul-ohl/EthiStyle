use argon2::{password_hash::SaltString, Argon2, PasswordHash, PasswordHasher, PasswordVerifier};
use rand_core::OsRng;

use crate::domain::Hasher;

pub struct ArgonHasher;

impl Default for ArgonHasher {
    fn default() -> Self {
        Self::new()
    }
}

impl ArgonHasher {
    #[must_use]
    pub const fn new() -> Self {
        Self {}
    }
}

impl Hasher for ArgonHasher {
    fn hash_password(&self, password: &str) -> Result<String, String> {
        let salt = SaltString::generate(&mut OsRng);

        let password_hash = Argon2::default()
            .hash_password(password.as_bytes(), &salt)
            .map_err(|_| {
                "Failed to hash password, please try again or contact support if the problem persists"
                    .to_string()
            })?
            .to_string();
        Ok(password_hash)
    }

    fn verify(&self, password_sent: &str, db_hash: &str) -> bool {
        PasswordHash::new(db_hash).map_or(false, |parsed_hash| {
            Argon2::default()
                .verify_password(password_sent.as_bytes(), &parsed_hash)
                .is_ok()
        })
    }
}
