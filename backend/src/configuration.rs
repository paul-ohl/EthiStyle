use config::File;

#[derive(serde::Deserialize)]
pub struct Settings {
    pub database: DatabaseSettings,
    pub app_port: u16,
}

#[derive(serde::Deserialize)]
pub struct DatabaseSettings {
    pub username: String,
    pub password: String,
    pub port: u16,
    pub host: String,
    pub name: String,
}

pub fn get_config() -> Result<Settings, config::ConfigError> {
    let config = config::Config::builder()
        .add_source(File::with_name("configuration"))
        .build()?;
    config.try_deserialize()
}

impl DatabaseSettings {
    pub fn connection_string(&self) -> String {
        format!("{}/{}", self.connection_string_without_db(), self.name)
    }
    pub fn connection_string_without_db(&self) -> String {
        format!(
            "postgres://{}:{}@{}:{}",
            self.username, self.password, self.host, self.port
        )
    }
}
