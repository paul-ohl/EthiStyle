use serde::{Deserialize, Serialize};
use validator::validate_email;

#[derive(Debug, Deserialize, Serialize)]
pub struct Email(String);

impl Email {
    /// Parses a string into a valid `SubscriberEmail`.
    ///
    /// # Errors
    /// Returns an error if the provided string fails validation as an email address.
    /// The validation is performed by the `[validator::validate_email]` crate.
    pub fn parse(s: &str) -> Result<Self, String> {
        if validate_email(s) {
            Ok(Self(s.to_string()))
        } else {
            Err(format!("{s} is not a valid subscriber email."))
        }
    }
}

impl AsRef<str> for Email {
    fn as_ref(&self) -> &str {
        &self.0
    }
}
