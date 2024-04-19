#![allow(clippy::unwrap_used)]

mod helper;
use helper::*;
use reqwest::header;

#[tokio::test]
async fn write_message_works_with_proper_data() {
    let (test_app, jwt_token) = spawn_app_with_logged_user().await;
    let other_user_id = create_additional_user(&test_app).await;
    let body = r#"{"content": "Hi, I'm Jane coleman, What is your name on this platform???"}"#;
    let client = reqwest::Client::new();

    let response = client
        .post(&format!("{}/messages/{other_user_id}", &test_app.address))
        .header(header::AUTHORIZATION, "Bearer ".to_owned() + &jwt_token)
        .header(header::CONTENT_TYPE, "application/json")
        .body(body)
        .send()
        .await
        .expect("Failed to execute request.");

    assert_eq!("200", response.status().as_str());
    let saved = sqlx::query!("SELECT * FROM Messages")
        .fetch_all(&test_app.app_state.db)
        .await
        .expect("Failed to fetch from db.");
    assert_eq!(saved.len(), 1);
}

#[tokio::test]
async fn write_message_fails_with_wrong_data() {
    let (test_app, jwt_token) = spawn_app_with_logged_user().await;
    let other_user_id = create_additional_user(&test_app).await;
    let wrong_bodies = [
        r#"Hi, I'm Jane coleman, What is your name on this platform???"#,
        r#"{"content": ""}"#,
    ];
    let client = reqwest::Client::new();

    for wrong_body in wrong_bodies {
        let response = client
            .post(&format!("{}/messages/{other_user_id}", &test_app.address))
            .header(header::AUTHORIZATION, "Bearer ".to_owned() + &jwt_token)
            .header(header::CONTENT_TYPE, "application/json")
            .body(wrong_body)
            .send()
            .await
            .expect("Failed to execute request.");

        assert_eq!("400", response.status().as_str());
        let saved = sqlx::query!("SELECT * FROM Messages")
            .fetch_all(&test_app.app_state.db)
            .await
            .expect("Failed to fetch from db.");
        assert_eq!(saved.len(), 0);
    }
}
