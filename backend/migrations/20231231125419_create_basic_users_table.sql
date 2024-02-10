CREATE TABLE Users (
	id uuid NOT NULL,
	PRIMARY KEY (id),
	email varchar(32) NOT NULL,
	UNIQUE (email),
	username varchar(32) NOT NULL,
	password_hash varchar(32) NOT NULL,
	subscribed_at timestamptz NOT NULL
);
