use super::password_hash::PasswordHash;
use validator::{Validate, ValidationError};

#[derive(Validate)]
pub struct RegisterUserDto {
    #[validate(email)]
    pub email: String,
    #[validate(length(min = 1, max = 256), custom = "check_invalid_characters")]
    pub username: String,
    pub hash: PasswordHash,
}

/// # Errors
/// Returns `Err` if the provided subscriber name is empty, too long, too short, or contains
/// forbidden characters.
pub fn check_invalid_characters(s: &str) -> Result<(), ValidationError> {
    let s = s.trim().to_string();
    let forbidden_characters = ['/', '(', ')', '"', '<', '>', '\\', '{', '}'];
    if s.is_empty() {
        Err(ValidationError::new("Subscriber name cannot be empty"))
    } else if s.chars().any(|g| forbidden_characters.contains(&g)) {
        Err(ValidationError::new(
            "Subscriber name contains invalid characters",
        ))
    } else {
        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::application::ArgonHasher;
    use std::sync::Arc;

    #[test]
    fn register_user_dto_works_with_proper_data() {
        let hasher = ArgonHasher::new();

        let dto = RegisterUserDto {
            email: "m.hamilton@nasa.gov".to_string(),
            username: "Margaret Hamilton".to_string(),
            hash: PasswordHash::hash_string("password", Arc::new(hasher)).expect("Shouldn't fail"),
        };
        assert!(dto.validate().is_ok());
    }

    #[test]
    fn register_user_dto_fails_with_wrong_data() {
        let hasher = ArgonHasher::new();

        let dto = RegisterUserDto {
            email: "email=m.hamilton@nasa.gov&password=password".to_string(),
            username: "Margaret Hamilton".to_string(),
            hash: PasswordHash::hash_string("password", Arc::new(hasher)).expect("Shouldn't fail"),
        };
        assert!(dto.validate().is_err());
    }
}
