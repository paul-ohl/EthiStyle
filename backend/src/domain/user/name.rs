use serde::{Deserialize, Serialize};
use unicode_segmentation::UnicodeSegmentation;

#[derive(Debug, Serialize, Deserialize)]
pub struct Name(String);

impl Name {
    /// # Errors
    /// Returns `Err` if the provided name is empty, longer than 256 bytes or contains invalid characters.
    pub fn parse(s: &str) -> Result<Self, String> {
        let s = s.trim().to_string();
        let forbidden_characters = ['/', '(', ')', '"', '<', '>', '\\', '{', '}'];
        if s.is_empty() {
            Err("Subscriber name cannot be empty".into())
        } else if s.graphemes(true).count() > 256 {
            Err("Subscriber name is too long".into())
        } else if s.chars().any(|g| forbidden_characters.contains(&g)) {
            Err("Subscriber name contains invalid characters".into())
        } else {
            Ok(Self(s))
        }
    }
}

impl AsRef<str> for Name {
    fn as_ref(&self) -> &str {
        &self.0
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use claims::{assert_err, assert_ok};

    #[test]
    fn succeed_on_valid_input() {
        assert_ok!(Name::parse("hello-world"));
        assert_ok!(Name::parse("hello world"));
        assert_ok!(Name::parse(&"a".repeat(256)));
    }

    #[test]
    fn fail_on_empty_string() {
        assert_err!(Name::parse(""));
        assert_err!(Name::parse("    "));
    }

    #[test]
    fn fail_on_invalid_characters() {
        let name = "hello(world)";
        assert_err!(Name::parse(name));
        for name in &['/', '(', ')', '"', '<', '>', '\\', '{', '}'] {
            let name = name.to_string();
            assert_err!(Name::parse(&name));
        }
    }

    #[test]
    fn fail_on_too_long_string() {
        let name = Name::parse(&"a".repeat(257));
        assert!(name.is_err());
    }
}
