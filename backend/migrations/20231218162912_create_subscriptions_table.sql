CREATE TABLE subscriptions (
	id uuid NOT NULL,
	PRIMARY KEY (id),
	email TEXT NOT NULL,
	UNIQUE (email),
	name TEXT NOT NULL,
	subscribed_at timestamptz NOT NULL
);
