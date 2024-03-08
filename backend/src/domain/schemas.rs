use serde::Deserialize;

#[derive(Deserialize, Debug, Default)]
pub struct FilterOptions {
    pub offset: Option<usize>,
    pub limit: Option<usize>,
}

#[derive(Deserialize, Debug)]
pub struct ParamOptions {
    pub id: String,
}
