#![allow(clippy::unwrap_used)]

mod helper;
use helper::*;
use serde_json::json;

#[tokio::test]
async fn register_returns_a_200_for_valid_form_data() {
    let test_app = spawn_app().await;
    let client = reqwest::Client::new();
    let body = json!({
        "name":"Margaret Hamilton",
        "email":"m.hamilton@nasa.gov",
        "password":"password"
    })
    .to_string();

    let response = client
        .post(&format!("{}/register", &test_app.address))
        .header("Content-Type", "application/json")
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
        (String::from("{}"), "missing all fields"),
        (
            json!({"email": "m.hamilton@nasa.gov", "password": "password"}).to_string(),
            "missing username",
        ),
        (
            json!({"name": "Margaret Hamilton", "password": "password"}).to_string(),
            "missing email",
        ),
        (
            json!({"name": "Margaret Hamilton", "email": "m.hamilton@nasa.gov"}).to_string(),
            "missing password",
        ),
    ];

    for (invalid_body, error_message) in test_cases {
        let response = client
            .post(&format!("{}/register", &test_app.address))
            .header("Content-Type", "application/json")
            .body(invalid_body)
            .send()
            .await
            .expect("Failed to execute request.");

        assert_eq!(
            400,
            response.status().as_u16(),
            "The API did not fail with 400 Bad Request when the payload was {error_message}."
        );
    }
}

#[tokio::test]
async fn register_returns_a_422_when_some_fields_are_empty() {
    let test_app = spawn_app().await;
    let client = reqwest::Client::new();
    let test_cases = vec![
        (
            json!({"email": "", "name": "Margaret Hamilton"}).to_string(),
            "email is empty",
        ),
        (
            json!({"email": "m.hamilton@nasa.gov", "name": ""}).to_string(),
            "name is empty",
        ),
        (
            json!({"email": "", "name": ""}).to_string(),
            "both are empty",
        ),
    ];

    for (invalid_body, error_message) in test_cases {
        let response = client
            .post(&format!("{}/register", &test_app.address))
            .header("Content-Type", "application/json")
            .body(invalid_body)
            .send()
            .await
            .expect("Failed to execute request.");

        assert_eq!(
            400,
            response.status().as_u16(),
            "The API did not fail with 400 Bad Request when the payload was {error_message}."
        );
    }
}
