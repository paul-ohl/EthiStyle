#![allow(clippy::unwrap_used)]

mod helper;
use helper::*;

#[tokio::test]
async fn register_returns_a_200_for_valid_form_data() {
    let test_app = spawn_app().await;
    let client = reqwest::Client::new();
    let body = "name=Margaret Hamilton&email=m.hamilton@nasa.gov&password=password";

    let response = client
        .post(&format!("{}/register", &test_app.address))
        .header("Content-Type", "application/x-www-form-urlencoded")
        .body(body)
        .send()
        .await
        .expect("Failed to execute request.");

    assert_eq!("200", response.status().as_str());
    let saved = sqlx::query!("SELECT email, username, password_hash FROM Users")
        .fetch_one(&test_app.app_state.db)
        .await
        .expect("Failed to fetch from db.");
    assert_eq!("Margaret Hamilton", saved.username);
    assert_eq!("m.hamilton@nasa.gov", saved.email);
    assert!(
        test_app
            .app_state
            .hasher
            .verify(&saved.password_hash, "password"),
        "Current password hash is: {}",
        &saved.password_hash
    );
}

#[tokio::test]
async fn register_returns_a_422_when_data_is_missing() {
    let test_app = spawn_app().await;
    let client = reqwest::Client::new();
    let test_cases = vec![
        ("", "missing all fields"),
        (
            "email=m.hamilton@nasa.gov&password=password",
            "missing username",
        ),
        ("name=Margaret Hamilton&password=password", "missing email"),
        (
            "name=Margaret Hamilton&email=m.hamilton@nasa.gov",
            "missing password",
        ),
    ];

    for (invalid_body, error_message) in test_cases {
        let response = client
            .post(&format!("{}/register", &test_app.address))
            .header("Content-Type", "application/x-www-form-urlencoded")
            .body(invalid_body)
            .send()
            .await
            .expect("Failed to execute request.");

        assert_eq!(
            422,
            response.status().as_u16(),
            "The API did not fail with 422 Bad Request when the payload was {error_message}."
        );
    }
}

#[tokio::test]
async fn register_returns_a_422_when_some_fields_are_empty() {
    let test_app = spawn_app().await;
    let client = reqwest::Client::new();
    let test_cases = vec![
        ("email=&name=Margaret Hamilton", "email is empty"),
        ("email=m.hamilton@nasa.gov&name=", "name is empty"),
        ("email=&name=", "both are empty"),
    ];

    for (invalid_body, error_message) in test_cases {
        let response = client
            .post(&format!("{}/register", &test_app.address))
            .header("Content-Type", "application/x-www-form-urlencoded")
            .body(invalid_body)
            .send()
            .await
            .expect("Failed to execute request.");

        assert_eq!(
            422,
            response.status().as_u16(),
            "The API did not fail with 422 Bad Request when the payload was {error_message}."
        );
    }
}
