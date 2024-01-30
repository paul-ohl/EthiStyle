use secrecy::{ExposeSecret, Secret};

use super::PasswordHash;

#[derive(Debug)]
pub struct ClearPassword(Secret<String>);

impl ClearPassword {
    /// # Errors
    /// Returns `Err` if the provided password is empty,
    /// shorter than 8 characters or is longer than 256
    pub fn parse(s: &str) -> Result<Self, String> {
        let s = PasswordHash::verify_syntax(s)?;
        Ok(Self(Secret::new(s.to_string())))
    }

    #[must_use]
    pub fn expose_secret(&self) -> &str {
        self.0.expose_secret()
    }
}
