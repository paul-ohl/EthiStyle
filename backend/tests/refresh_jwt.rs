#![allow(clippy::unwrap_used)]

mod helper;
use ethistyle::domain::jwt_claims::{JwtClaims, UserType};
use helper::*;
use reqwest::header;

#[tokio::test]
async fn refresh_jwt_returns_a_new_one_for_valid_jwt() {
    let (test_app, jwt_token) = spawn_app_with_logged_user().await;

    let client = reqwest::Client::new();

    let response = client
        .post(&format!("{}/get_jwt", &test_app.address))
        .header(header::CONTENT_TYPE, "application/json")
        .header(header::AUTHORIZATION, "Bearer ".to_owned() + &jwt_token)
        .send()
        .await
        .expect("Failed to execute request.");

    assert_eq!("200", response.status().as_str());
    let jwt = response.text().await.unwrap();
    let claims = JwtClaims::decode(&jwt, &test_app.app_state.jwt_secret).unwrap();
    assert_eq!(claims.user_type, UserType::User);
    assert_eq!(claims.user_email, "m.hamilton@nasa.gov".to_owned());
    assert_eq!(claims.user_name, "Margaret Hamilton".to_owned());
}
