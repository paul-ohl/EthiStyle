# My digital project - Remae

This is a school project for My Digital School Lyon.

## The team

- Chloé: UI/UX designer
- Léo and Imene: Marketing
- Lina: Creative direction
- Paul: Development

## The technology

The backend is written in Rust using axum.
The frontend is written in React.

## Dev notes

`TEST_LOG=true cargo test test_name | bunyan` to run a specific test with bunyan
enabled to read the logs
`docker build -t remae .` in the backend directory to build the backend
docker image

## TODOS

- [ ] The token id will be saved to the database and to validate that it is allowed.
- [ ] A "log out" and a "log everything out" routes will be implemented.
