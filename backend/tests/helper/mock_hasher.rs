use ethistyle::domain::Hasher;
use tracing_log::log::info;

pub struct MockHasher;

impl Hasher for MockHasher {
    fn hash_password(&self, password: &str) -> Result<String, String> {
        Ok(password.to_string())
    }
    fn verify(&self, password_sent: &str, db_hash: &str) -> bool {
        info!(
            "password_sent: {}, password in db: {}",
            password_sent, db_hash
        );
        password_sent == db_hash
    }
}

impl MockHasher {
    pub const fn new() -> Self {
        Self {}
    }
}
