#![allow(clippy::unwrap_used)]

mod helper;
use ethistyle::domain::{jwt_claims::JwtClaims, ItemsModel};
use helper::*;
use reqwest::header;
use uuid::Uuid;

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
    let saved = sqlx::query!("SELECT seller_id, name, price, description, is_sold FROM Items")
        .fetch_one(&test_app.app_state.db)
        .await
        .expect("Failed to fetch from db.");
    assert_eq!("Item 1", saved.name);
    assert!((50.00 - saved.price).abs() < f64::EPSILON); // Compare floating point numbers
    assert_eq!("Description of item 1", saved.description);
    assert!(!saved.is_sold);
    let claims = JwtClaims::decode(&jwt_token, &test_app.app_state.jwt_secret).unwrap();
    assert_eq!(claims.user_id, saved.seller_id);
}

#[tokio::test]
async fn create_item_returns_error_with_invalid_data() {
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

async fn create_item_and_get_id(test_app: &TestApp, jwt_token: &str) -> Uuid {
    let body = r#"{"name": "Item 1", "price": 50.00, "description": "Description of item 1"}"#;
    let client = reqwest::Client::new();
    let response = client
        .post(&format!("{}/items", &test_app.address))
        .header(header::AUTHORIZATION, "Bearer ".to_owned() + jwt_token)
        .header(header::CONTENT_TYPE, "application/json")
        .body(body)
        .send()
        .await
        .expect("Failed to execute request.");
    assert_eq!("200", response.status().as_str());
    let saved = sqlx::query!("SELECT id FROM Items")
        .fetch_one(&test_app.app_state.db)
        .await
        .expect("Failed to fetch from db.");
    saved.id
}

#[derive(Debug, serde::Deserialize)]
struct OneItemResponse {
    status: String,
    data: ItemsModel,
}

#[tokio::test]
async fn get_one_item_works_with_correct_data() {
    let (test_app, jwt_token) = spawn_app_with_logged_user().await;
    let item_id = create_item_and_get_id(&test_app, &jwt_token).await;
    let client = reqwest::Client::new();

    let response = client
        .get(&format!("{}/items/{item_id}", &test_app.address))
        .header(header::AUTHORIZATION, "Bearer ".to_owned() + &jwt_token)
        .send()
        .await
        .expect("Failed to execute request.");

    assert_eq!("200", response.status().as_str());
    let item = response.text().await.unwrap();
    let item: OneItemResponse = serde_json::from_str(&item).expect("Failed to parse response");
    assert_eq!("success", item.status);
    assert_eq!("Item 1", item.data.name);
    assert!((50.00 - item.data.price).abs() < f64::EPSILON); // Compare floating point numbers
    assert_eq!("Description of item 1", item.data.description);
}

#[tokio::test]
async fn get_item_returns_error_with_invalid_data() {
    let (test_app, jwt_token) = spawn_app_with_logged_user().await;
    let _ = create_item_and_get_id(&test_app, &jwt_token).await;
    let client = reqwest::Client::new();

    let response = client
        .get(&format!("{}/items/{}", &test_app.address, Uuid::new_v4()))
        .header(header::AUTHORIZATION, "Bearer ".to_owned() + &jwt_token)
        .send()
        .await
        .expect("Failed to execute request.");
    assert_eq!("404", response.status().as_str());
}

#[derive(Debug, serde::Deserialize)]
struct MultipleItemsResponse {
    status: String,
    length: usize,
    data: Vec<ItemsModel>,
}

#[tokio::test]
async fn get_all_item_works_with_existing_data() {
    let (test_app, jwt_token) = spawn_app_with_logged_user().await;
    let _ = create_item_and_get_id(&test_app, &jwt_token).await;
    let _ = create_item_and_get_id(&test_app, &jwt_token).await;
    let client = reqwest::Client::new();

    let response = client
        .get(&format!("{}/items", &test_app.address))
        .header(header::AUTHORIZATION, "Bearer ".to_owned() + &jwt_token)
        .send()
        .await
        .expect("Failed to execute request.");

    assert_eq!("200", response.status().as_str());
    let response = response.text().await.unwrap();
    let item: MultipleItemsResponse =
        serde_json::from_str(&response).expect("Failed to parse response");
    assert_eq!("success", item.status);
    assert_eq!(2, item.length);
    assert_eq!(item.length, item.data.len());
    assert!((50.00 - item.data[0].price).abs() < f64::EPSILON); // Compare floating point numbers
    assert_eq!("Description of item 1", item.data[0].description);
}

#[tokio::test]
async fn get_all_item_works_with_no_data() {
    let (test_app, jwt_token) = spawn_app_with_logged_user().await;
    let client = reqwest::Client::new();

    let response = client
        .get(&format!("{}/items", &test_app.address))
        .header(header::AUTHORIZATION, "Bearer ".to_owned() + &jwt_token)
        .send()
        .await
        .expect("Failed to execute request.");

    assert_eq!("200", response.status().as_str());
    let response = response.text().await.unwrap();
    let item: MultipleItemsResponse =
        serde_json::from_str(&response).expect("Failed to parse response");
    assert_eq!("success", item.status);
    assert_eq!(0, item.length);
    assert_eq!(item.length, item.data.len());
}

#[tokio::test]
async fn edit_works_with_correct_data() {
    let (test_app, jwt_token) = spawn_app_with_logged_user().await;
    let item_id = create_item_and_get_id(&test_app, &jwt_token).await;
    let client = reqwest::Client::new();
    let body = r#"{"name": "Item 2", "price": 60.00, "description": "Description of item 2", "is_sold": true}"#;

    let response = client
        .patch(&format!("{}/items/{}", &test_app.address, item_id))
        .header(header::AUTHORIZATION, "Bearer ".to_owned() + &jwt_token)
        .header(header::CONTENT_TYPE, "application/json")
        .body(body)
        .send()
        .await
        .expect("Failed to execute request.");

    assert_eq!("200", response.status().as_str());
    // assert_eq!("", response.text().await.unwrap());
    let saved = sqlx::query!(
        "SELECT name, price, description, is_sold FROM Items WHERE id = $1",
        item_id
    )
    .fetch_one(&test_app.app_state.db)
    .await
    .expect("Failed to fetch from db.");
    assert_eq!("Item 2", saved.name);
    assert!((60.00 - saved.price).abs() < f64::EPSILON); // Compare floating point numbers
    assert_eq!("Description of item 2", saved.description);
    assert!(saved.is_sold);
}

#[tokio::test]
async fn edit_fails_with_incorrect_data() {
    let (test_app, jwt_token) = spawn_app_with_logged_user().await;
    let _ = create_item_and_get_id(&test_app, &jwt_token).await;
    let client = reqwest::Client::new();
    let body = r#"{"name": "Item 2", "price": 60.00, "description": "Description of item 2", "is_sold": true}"#;

    let response = client
        .patch(&format!("{}/items/{}", &test_app.address, Uuid::new_v4()))
        .header(header::AUTHORIZATION, "Bearer ".to_owned() + &jwt_token)
        .header(header::CONTENT_TYPE, "application/json")
        .body(body)
        .send()
        .await
        .expect("Failed to execute request.");

    assert_eq!("404", response.status().as_str());
}

#[tokio::test]
async fn delete_item_works_successfully() {
    let (test_app, jwt_token) = spawn_app_with_logged_user().await;
    let item_id = create_item_and_get_id(&test_app, &jwt_token).await;

    let client = reqwest::Client::new();

    let response = client
        .delete(&format!("{}/items/{}", &test_app.address, item_id))
        .header(header::AUTHORIZATION, "Bearer ".to_owned() + &jwt_token)
        .send()
        .await
        .expect("Failed to execute request.");

    assert_eq!("204", response.status().as_str());

    // Ensure the item is deleted from the database
    let result = sqlx::query!("SELECT COUNT(*) as count FROM Items WHERE id = $1", item_id)
        .fetch_one(&test_app.app_state.db)
        .await
        .expect("Failed to fetch from db.");
    assert_eq!(0, result.count.unwrap());
}

#[tokio::test]
async fn delete_item_fails_if_item_does_not_exist() {
    let (test_app, jwt_token) = spawn_app_with_logged_user().await;

    let invalid_item_id = 9999;

    let client = reqwest::Client::new();

    let response = client
        .delete(&format!("{}/items/{}", &test_app.address, invalid_item_id))
        .header(header::AUTHORIZATION, "Bearer ".to_owned() + &jwt_token)
        .send()
        .await
        .expect("Failed to execute request.");

    assert_eq!("400", response.status().as_str());
}
