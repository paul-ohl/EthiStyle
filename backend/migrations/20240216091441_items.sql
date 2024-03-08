CREATE TABLE Items (
	id uuid NOT NULL,
	PRIMARY KEY (id),

	seller_id uuid NOT NULL,
  FOREIGN KEY (seller_id) REFERENCES Users(id),

  name varchar(32) NOT NULL,
  price float NOT NULL,
  description text NOT NULL,

  date_added timestamptz NOT NULL,
  is_sold boolean NOT NULL DEFAULT false
);
