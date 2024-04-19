CREATE TABLE Messages (
	id uuid NOT NULL,
	PRIMARY KEY (id),

	sender_id uuid NOT NULL,
  FOREIGN KEY (sender_id) REFERENCES Users(id),

	receiver_id uuid NOT NULL,
  FOREIGN KEY (receiver_id) REFERENCES Users(id),

  date_sent timestamptz NOT NULL,
  content text NOT NULL
);

-- id, sender_id, receiver_id, date_sent, content
