FROM lukemathwalker/cargo-chef:latest-rust-1.74.1 as chef
WORKDIR /app
RUN apt-get update && apt-get install clang mold -y

# This step computes a lock file for the project
FROM chef as  planner
COPY . .
RUN cargo chef prepare --recipe-path recipe.json

# This step builds only the project's dependencies
FROM chef as builder
COPY --from=planner /app/recipe.json recipe.json
RUN cargo chef cook --release --recipe-path recipe.json

COPY . .
ENV SQLX_OFFLINE=true
RUN cargo build --release --bin remae

# Runtime stage, only the things in that stage will be in the final image
FROM debian:bookworm-slim AS runtime
WORKDIR /app

RUN apt-get update -y \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && apt-get autoremove -y \
  && apt-get clean -y \
  && rm -rf /var/lib/apt/lists/*

RUN chown -R remae:remae /app

COPY --from=builder /app/target/release/remae remae
COPY configuration configuration
ENV APP_ENVIRONMENT=production

USER remae

ENTRYPOINT [ "./remae" ]
