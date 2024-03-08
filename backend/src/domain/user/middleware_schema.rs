use uuid::Uuid;

#[derive(Debug, Clone)]
pub struct CurrentUser {
    pub id: Uuid,
    pub name: String,
    pub email: String,
}
