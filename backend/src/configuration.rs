use config::File;
use secrecy::{ExposeSecret, Secret};

pub fn get_config() -> Result<Settings, config::ConfigError> {
    let config = config::Config::builder();
    let base_path = std::env::current_dir().expect("Failed to determine the current directory");

    let configuration_dir = base_path.join("configuration");
    let config = config.add_source(File::from(configuration_dir.join("base")).required(true));

    let app_env: Environment = std::env::var("APP_ENVIRONMENT")
        .unwrap_or_else(|_| "dev".into())
        .try_into()
        .expect("Failed to parse APP_ENVIRONMENT");

    let config = config
        .add_source(File::from(configuration_dir.join(app_env.as_str())).required(true))
        .build()?;
    config.try_deserialize()
}

pub enum Environment {
    Dev,
    Prod,
}

impl Environment {
    pub fn as_str(&self) -> &'static str {
        match self {
            Environment::Dev => "dev",
            Environment::Prod => "prod",
        }
    }
}

impl TryFrom<String> for Environment {
    type Error = String;
    fn try_from(s: String) -> Result<Self, Self::Error> {
        match s.to_lowercase().as_str() {
            "dev" | "local" | "development" => Ok(Self::Dev),
            "prod" | "production" => Ok(Self::Prod),
            other => Err(format!(
                "{} is not a supported environment. Use either `dev` or `prod`.",
                other
            )),
        }
    }
}

#[derive(serde::Deserialize)]
pub struct Settings {
    pub database: DatabaseSettings,
    pub application: AppSettings,
}

#[derive(serde::Deserialize)]
pub struct AppSettings {
    pub host: String,
    pub port: u16,
}

#[derive(serde::Deserialize)]
pub struct DatabaseSettings {
    pub username: String,
    pub password: Secret<String>,
    pub port: u16,
    pub host: String,
    pub name: String,
}

impl DatabaseSettings {
    pub fn connection_string(&self) -> Secret<String> {
        Secret::new(format!(
            "{}/{}",
            self.connection_string_without_db().expose_secret(),
            self.name
        ))
    }

    pub fn connection_string_without_db(&self) -> Secret<String> {
        Secret::new(format!(
            "postgres://{}:{}@{}:{}",
            self.username,
            self.password.expose_secret(),
            self.host,
            self.port
        ))
    }
}
