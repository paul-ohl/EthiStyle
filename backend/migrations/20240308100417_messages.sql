CREATE TABLE ItemBundle (
  id uuid NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE ItemBundleToItems (
  bundle_id uuid NOT NULL,
  FOREIGN KEY (bundle_id) REFERENCES Items(id),

  item_id uuid NOT NULL,
  FOREIGN KEY (item_id) REFERENCES Items(id)
);

CREATE TABLE Conversation (
  id uuid NOT NULL,
  PRIMARY KEY (id),

  itemBundle uuid NOT NULL,
  FOREIGN KEY (itemBundle) REFERENCES ItemBundle(id),

  user1 uuid NOT NULL,
  FOREIGN KEY (user1) REFERENCES Users(id),

  user2 uuid NOT NULL,
  FOREIGN KEY (user2) REFERENCES Users(id)
);

CREATE TABLE Messages (
  id uuid NOT NULL,
  PRIMARY KEY (id),

  sender_id uuid NOT NULL,
  FOREIGN KEY (sender_id) REFERENCES Users(id),

  conversation_id uuid NOT NULL,
  FOREIGN KEY (conversation_id) REFERENCES Conversation(id),

  date_sent timestamptz NOT NULL,
  content text NOT NULL
);
