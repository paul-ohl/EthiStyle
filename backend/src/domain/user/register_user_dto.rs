use super::{email::Email, name::Name, password_hash::PasswordHash};

pub struct RegisterUserDto {
    pub email: Email,
    pub username: Name,
    pub hash: PasswordHash,
}
