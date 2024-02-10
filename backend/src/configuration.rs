use config::File;
use secrecy::{ExposeSecret, Secret};
use serde_aux::field_attributes::deserialize_number_from_string;
use sqlx::{
    postgres::{PgConnectOptions, PgSslMode},
    ConnectOptions,
};

/// # Panics
/// Panics if any of the required environment variables are missing or if the configuration file can't be read.
///
/// # Errors
/// Returns an error if the configuration file is malformed.
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

#[derive(Debug, PartialEq, Eq)]
pub enum Environment {
    Dev,
    Prod,
}

impl Environment {
    #[must_use]
    pub const fn as_str(&self) -> &'static str {
        match self {
            Self::Dev => "dev",
            Self::Prod => "prod",
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
                "{other} is not a supported environment. Use either `dev` or `prod`.",
            )),
        }
    }
}

#[derive(serde::Deserialize)]
pub struct Settings {
    pub database: DatabaseSettings,
    pub application: AppSettings,
    pub jwt_secret: String,
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
    #[must_use]
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

    #[must_use]
    pub fn with_db(&self) -> PgConnectOptions {
        self.without_db()
            .database(&self.name)
            .log_statements(tracing::log::LevelFilter::Trace)
    }
}

#[allow(clippy::unwrap_used)]
#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn environment_parsing() {
        assert_eq!(
            Environment::Dev,
            Environment::try_from("dev".to_string()).unwrap()
        );
        assert_eq!(
            Environment::Dev,
            Environment::try_from("development".to_string()).unwrap()
        );
        assert_eq!(
            Environment::Dev,
            Environment::try_from("local".to_string()).unwrap()
        );
        assert_eq!(
            Environment::Prod,
            Environment::try_from("prod".to_string()).unwrap()
        );
        assert_eq!(
            Environment::Prod,
            Environment::try_from("production".to_string()).unwrap()
        );
        assert!(Environment::try_from("something else".to_string()).is_err());
    }
}
