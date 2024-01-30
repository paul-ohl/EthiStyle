mod helper;
use helper::*;

async fn spawn_app_with_logged_user() -> (TestApp, String) {
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
    (test_app, response.text().await.unwrap())
}

#[tokio::test]
async fn protected_endpoint_returns_200_with_a_correct_jwt() {
    let (test_app, jwt_token) = spawn_app_with_logged_user().await;
    let client = reqwest::Client::new();

    let response = client
        .get(&format!("{}/protected_endpoint", &test_app.address))
        .header("Authorization", "Bearer ".to_owned() + &jwt_token)
        .send()
        .await
        .expect("Failed to execute request.");

    assert!(response.status().is_success());
    assert_eq!(Some(0), response.content_length());
}
