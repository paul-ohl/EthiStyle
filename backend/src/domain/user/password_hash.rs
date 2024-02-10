use std::sync::Arc;

use argon2::{
    password_hash::{rand_core::OsRng, PasswordHasher, SaltString},
    Argon2,
};
use secrecy::{ExposeSecret, Secret};
use unicode_segmentation::UnicodeSegmentation;

use crate::domain::Hasher;

#[derive(Debug)]
pub struct PasswordHash(Secret<String>);

impl PasswordHash {
    /// # Errors
    /// Returns `Err` if the provided password is empty,
    /// shorter than 8 characters or is longer than 256 bytes.
    #[allow(clippy::needless_pass_by_value)] // I am not talented enough to remove this allow
    pub fn hash_string(s: &str, hasher: Arc<dyn Hasher>) -> Result<Self, String> {
        let s = Self::verify_syntax(s)?;
        Ok(Self(Secret::new(hasher.hash_password(s)?)))
    }

    pub(super) fn verify_syntax(s: &str) -> Result<&str, String> {
        let s = s.trim();
        if s.is_empty() {
            Err("Subscriber name cannot be empty".into())
        } else if s.graphemes(true).count() < 8 {
            Err("Subscriber name is too short, minimum 8 characters".into())
        } else if s.graphemes(true).count() > 64 {
            Err("Subscriber name is too long, maximum 64 characters".into())
        } else {
            Ok(s)
        }
    }

    #[must_use]
    pub fn expose_secret(&self) -> &str {
        self.0.expose_secret()
    }
}

#[cfg(test)]
mod tests {
    use crate::application::ArgonHasher;

    use super::*;
    use claims::{assert_err, assert_ok};

    #[test]
    fn succeed_on_valid_input() {
        let hasher = Arc::new(ArgonHasher::new());
        assert_ok!(PasswordHash::hash_string("hello-world", hasher.clone()));
        assert_ok!(PasswordHash::hash_string("hello world", hasher.clone()));
        assert_ok!(PasswordHash::hash_string(&"a".repeat(64), hasher));
    }

    #[test]
    fn fail_on_empty_string() {
        let hasher = Arc::new(ArgonHasher::new());
        assert_err!(PasswordHash::hash_string("", hasher.clone()));
        assert_err!(PasswordHash::hash_string("    ", hasher));
    }

    #[test]
    fn fail_on_too_short_string() {
        let hasher = Arc::new(ArgonHasher::new());
        let name = PasswordHash::hash_string(&"a".repeat(7), hasher);
        assert!(name.is_err());
    }

    #[test]
    fn fail_on_too_long_string() {
        let hasher = Arc::new(ArgonHasher::new());
        let name = PasswordHash::hash_string(&"a".repeat(65), hasher);
        assert!(name.is_err());
    }
}
