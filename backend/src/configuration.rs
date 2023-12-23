use config::File;
use secrecy::{ExposeSecret, Secret};
use serde_aux::field_attributes::deserialize_number_from_string;
use sqlx::{
    postgres::{PgConnectOptions, PgSslMode},
    ConnectOptions,
};

pub fn get_config() -> Result<Settings, config::ConfigError> {
    let config = config::Config::builder();
    let base_path = std::env::current_dir().expect("Failed to determine the current directory");

    let configuration_dir = base_path.join("configuration");
    let config = config.add_source(File::from(configuration_dir.join("base")).required(true));

    let app_env: Environment = std::env::var("APP_ENVIRONMENT")
        .unwrap_or_else(|_| "dev".into())
        .try_into()
        .expect("Failed to parse APP_ENVIRONMENT");
    let config =
        config.add_source(File::from(configuration_dir.join(app_env.as_str())).required(true));

    let config = config.add_source(config::Environment::with_prefix("app").separator("_"));

    let config = config.build()?;
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
    #[serde(deserialize_with = "deserialize_number_from_string")]
    pub port: u16,
}

#[derive(serde::Deserialize)]
pub struct DatabaseSettings {
    pub username: String,
    pub password: Secret<String>,
    #[serde(deserialize_with = "deserialize_number_from_string")]
    pub port: u16,
    pub host: String,
    pub name: String,
    pub require_ssl: bool,
}

impl DatabaseSettings {
    pub fn without_db(&self) -> PgConnectOptions {
        let ssl_mode = if self.require_ssl {
            PgSslMode::Require
        } else {
            PgSslMode::Prefer
        };

        PgConnectOptions::new()
            .host(&self.host)
            .port(self.port)
            .username(&self.username)
            .password(self.password.expose_secret())
            .ssl_mode(ssl_mode)
    }

    pub fn with_db(&self) -> PgConnectOptions {
        self.without_db()
            .database(&self.name)
            .log_statements(tracing::log::LevelFilter::Trace)
    }
}
