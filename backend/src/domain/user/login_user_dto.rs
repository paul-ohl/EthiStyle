use validator::Validate;

use super::clear_password::ClearPassword;

#[derive(Validate)]
pub struct LoginUserDto {
    #[validate(email)]
    pub email: String,
    pub password: ClearPassword,
}
