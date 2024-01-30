#![allow(dead_code)] // This is used in integration tests

#[cfg(test)]
mod mock_hasher;
#[cfg(test)]
mod spawn_app;

#[cfg(test)]
pub use spawn_app::*;
