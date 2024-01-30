pub trait Hasher {
    /// # Errors
    /// This function may fail if the hashing algorithm fails, which is unlikedly
    fn hash_password(&self, password: &str) -> Result<String, String>;
    fn verify(&self, user_password: &str, db_hash: &str) -> bool;
}
