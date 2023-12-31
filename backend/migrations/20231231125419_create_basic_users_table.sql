CREATE TABLE Users (
	id uuid NOT NULL,
	PRIMARY KEY (id),
	email TEXT NOT NULL,
	UNIQUE (email),
	username TEXT NOT NULL,
	password_hash TEXT NOT NULL,
	subscribed_at timestamptz NOT NULL
);
