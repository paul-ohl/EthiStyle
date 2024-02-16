#![allow(clippy::unwrap_used)]

mod helper;
use chrono::Utc;
use ethistyle::domain::jwt_claims::JwtClaims;
use helper::*;
use reqwest::header;
use secrecy::ExposeSecret;

#[tokio::test]
async fn protected_endpoint_returns_200_with_a_correct_jwt() {
    let (test_app, jwt_token) = spawn_app_with_logged_user().await;
    let client = reqwest::Client::new();

    let response = client
        .get(&format!("{}/protected_endpoint", &test_app.address))
        .header(header::AUTHORIZATION, "Bearer ".to_owned() + &jwt_token)
        .send()
        .await
        .expect("Failed to execute request.");

    assert!(response.status().is_success());
    assert_eq!(Some(0), response.content_length());
}

#[tokio::test]
async fn protected_endpoint_returns_401_with_expired_jwt() {
    let (test_app, jwt_token) = spawn_app_with_logged_user().await;
    let client = reqwest::Client::new();
    let now = Utc::now() - chrono::Duration::seconds(1);

    let claims = JwtClaims::decode(&jwt_token, &test_app.app_state.jwt_secret).unwrap();
    let expired_claims = JwtClaims::builder()
        .user_id(claims.user_id)
        .user_type(claims.user_type)
        .user_name(claims.user_name)
        .user_email(claims.user_email)
        .expires_at(now.timestamp())
        .build();
    let expired_jwt = expired_claims
        .encode(test_app.app_state.jwt_secret.expose_secret())
        .unwrap();

    let response = client
        .get(&format!("{}/protected_endpoint", &test_app.address))
        .header(header::AUTHORIZATION, "Bearer ".to_owned() + &expired_jwt)
        .send()
        .await
        .expect("Failed to execute request.");

    assert_eq!("401", response.status().as_str());
}
