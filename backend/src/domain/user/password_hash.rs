use argon2::{
    password_hash::{rand_core::OsRng, PasswordHasher, SaltString},
    Argon2,
};
use secrecy::Secret;
use unicode_segmentation::UnicodeSegmentation;

#[derive(Debug)]
pub struct PasswordHash(Secret<String>);

impl PasswordHash {
    /// # Errors
    /// Returns `Err` if the provided password is empty,
    /// shorter than 8 characters or is longer than 256 bytes.
    pub fn parse(s: &str) -> Result<Self, String> {
        let s = s.trim();
        if s.is_empty() {
            Err("Subscriber name cannot be empty".into())
        } else if s.graphemes(true).count() < 8 {
            Err("Subscriber name is too short, minimum 8 characters".into())
        } else if s.graphemes(true).count() > 256 {
            Err("Subscriber name is too long, maximum 256 characters".into())
        } else {
            Ok(Self(Secret::new(hash_password(s)?)))
        }
    }

    #[must_use]
    pub fn get_hash(&self) -> &Secret<String> {
        &self.0
    }
}

fn hash_password(password: &str) -> Result<String, String> {
    // Argon2 algorithm with default params (Argon2id v19)
    let argon2 = Argon2::default();
    let salt = SaltString::generate(&mut OsRng);

    // Hash password to PHC string ($argon2id$v=19$...)
    let password_hash = argon2
        .hash_password(password.as_bytes(), &salt)
        .map_err(|_| {
            "Failed to hash password, please try again or contact support if the problem persists"
                .to_string()
        })?
        .to_string();
    Ok(password_hash)

    // Verify password against PHC string.
    //
    // let parsed_hash = ArgonHash::new(&password_hash)?;
    // assert!(Argon2::default()
    //     .verify_password(password, &parsed_hash)
    //     .is_ok());
}

#[cfg(test)]
mod tests {
    use super::*;
    use claims::{assert_err, assert_ok};

    #[test]
    fn succeed_on_valid_input() {
        assert_ok!(PasswordHash::parse("hello-world"));
        assert_ok!(PasswordHash::parse("hello world"));
        assert_ok!(PasswordHash::parse(&"a".repeat(256)));
    }

    #[test]
    fn fail_on_empty_string() {
        assert_err!(PasswordHash::parse(""));
        assert_err!(PasswordHash::parse("    "));
    }

    #[test]
    fn fail_on_too_short_string() {
        let name = PasswordHash::parse(&"a".repeat(7));
        assert!(name.is_err());
    }

    #[test]
    fn fail_on_too_long_string() {
        let name = PasswordHash::parse(&"a".repeat(257));
        assert!(name.is_err());
    }
}
