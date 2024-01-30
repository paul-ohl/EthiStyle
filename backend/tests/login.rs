mod helper;
use ethistyle::domain::jwt::{decode_jwt, UserType};
use helper::*;

#[tokio::test]
async fn login_returns_a_200_for_valid_form_data() {
    let test_app = spawn_app_with_user().await;
    let client = reqwest::Client::new();
    let body = "email=m.hamilton@nasa.gov&password=password";

    let response = client
        .post(&format!("{}/login", &test_app.address))
        .header("Content-Type", "application/x-www-form-urlencoded")
        .body(body)
        .send()
        .await
        .expect("Failed to execute request.");

    assert_eq!("200", response.status().as_str());
    let jwt = response.text().await.unwrap();
    let claims = decode_jwt(&jwt, &test_app.app_state.jwt_secret).unwrap();
    assert_eq!(claims.user_type, UserType::User);
    assert_eq!(claims.user_email, Some("m.hamilton@nasa.gov".to_owned()));
    assert_eq!(claims.user_name, Some("Margaret Hamilton".to_owned()));
}

#[tokio::test]
async fn login_returns_a_401_when_data_is_wrong() {
    let test_app = spawn_app().await;
    let client = reqwest::Client::new();
    let test_cases = vec![
        (
            "email=i.dont@exist.com&password=password",
            "Email does not exist",
        ),
        (
            "email=m.hamilton@nasa.gov&password=something",
            "Password is wrong",
        ),
    ];

    for (invalid_body, error_message) in test_cases {
        let response = client
            .post(&format!("{}/login", &test_app.address))
            .header("Content-Type", "application/x-www-form-urlencoded")
            .body(invalid_body)
            .send()
            .await
            .expect("Failed to execute request.");

        assert_eq!(
            401,
            response.status().as_u16(),
            "The API did not fail with 401 when the payload was {}.",
            error_message
        );
    }
}

#[tokio::test]
async fn login_returns_a_422_when_data_is_missing() {
    let test_app = spawn_app().await;
    let client = reqwest::Client::new();
    let test_cases = vec![
        ("", "missing all fields"),
        ("password=secure_password", "missing email"),
        ("email=m.hamilton@nasa.gov", "missing password"),
    ];

    for (invalid_body, error_message) in test_cases {
        let response = client
            .post(&format!("{}/login", &test_app.address))
            .header("Content-Type", "application/x-www-form-urlencoded")
            .body(invalid_body)
            .send()
            .await
            .expect("Failed to execute request.");

        assert_eq!(
            422,
            response.status().as_u16(),
            "The API did not fail with 422 when the payload was {}.",
            error_message
        );
    }
}
