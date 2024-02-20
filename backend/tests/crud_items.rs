#![allow(clippy::unwrap_used)]

mod helper;
use ethistyle::domain::jwt_claims::JwtClaims;
use helper::*;
use reqwest::header;

#[tokio::test]
async fn create_item_works_with_correct_data() {
    let (test_app, jwt_token) = spawn_app_with_logged_user().await;
    let body = r#"{"name": "Item 1", "price": 50.00, "description": "Description of item 1"}"#;
    let client = reqwest::Client::new();

    let response = client
        .post(&format!("{}/items", &test_app.address))
        .header(header::AUTHORIZATION, "Bearer ".to_owned() + &jwt_token)
        .header(header::CONTENT_TYPE, "application/json")
        .body(body)
        .send()
        .await
        .expect("Failed to execute request.");

    assert_eq!("200", response.status().as_str());
    let saved = sqlx::query!("SELECT seller_id, name, price, description FROM Items")
        .fetch_one(&test_app.app_state.db)
        .await
        .expect("Failed to fetch from db.");
    assert_eq!("Item 1", saved.name);
    assert!((50.00 - saved.price).abs() < f64::EPSILON); // Compare floating point numbers
    assert_eq!("Description of item 1", saved.description);
    let claims = JwtClaims::decode(&jwt_token, &test_app.app_state.jwt_secret).unwrap();
    assert_eq!(claims.user_id, saved.seller_id);
}

#[tokio::test]
async fn protected_endpoint_returns_error_with_invalid_data() {
    let invalid_bodies = vec![
        r#"{"name": "Item 1", "price": "50.00", "description": "Description of item 1"}"#, // price is a string
        r#"{"price": 50.00, "description": "Description of item 1"}"#,
        r#"{"name": "Item 1", "description": "Description of item 1"}"#,
        r#"{"name": "Item 1", "price": 50.00}"#,
    ];
    let (test_app, jwt_token) = spawn_app_with_logged_user().await;
    let client = reqwest::Client::new();

    for body in invalid_bodies {
        let response = client
            .post(&format!("{}/items", &test_app.address))
            .header(header::AUTHORIZATION, "Bearer ".to_owned() + &jwt_token)
            .header(header::CONTENT_TYPE, "application/json")
            .body(body)
            .send()
            .await
            .expect("Failed to execute request.");
        assert_eq!("422", response.status().as_str());
    }
}
