use ethistyle::domain::Hasher;

pub struct MockHasher;

impl Hasher for MockHasher {
    fn hash_password(&self, password: &str) -> Result<String, String> {
        Ok(password.to_string())
    }
    fn verify(&self, user_password: &str, db_hash: &str) -> bool {
        user_password == db_hash
    }
}

impl MockHasher {
    pub const fn new() -> Self {
        Self {}
    }
}
