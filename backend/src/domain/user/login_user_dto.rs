use super::{clear_password::ClearPassword, email::Email};

pub struct LoginUserDto {
    pub email: Email,
    pub password: ClearPassword,
}
