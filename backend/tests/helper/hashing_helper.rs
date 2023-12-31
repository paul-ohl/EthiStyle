use argon2::PasswordVerifier;
use argon2::{Argon2, PasswordHash};

pub fn verify_hash(hash: &str, original_password: &str) -> bool {
    let parsed_hash = PasswordHash::new(hash).expect("Failed to parse hash");
    Argon2::default()
        .verify_password(original_password.as_bytes(), &parsed_hash)
        .is_ok()
}
