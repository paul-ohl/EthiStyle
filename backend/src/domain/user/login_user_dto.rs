use super::{email::Email, password_hash::PasswordHash};

pub struct LoginUserDto {
    pub email: Email,
    pub hash: PasswordHash,
}
