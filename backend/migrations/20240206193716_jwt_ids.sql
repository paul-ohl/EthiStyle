CREATE TABLE JwtIds (
  id uuid NOT NULL,
  PRIMARY KEY (id),
  user_id uuid NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(id)
);
