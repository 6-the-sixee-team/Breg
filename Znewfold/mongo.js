db.users.insertOne(
  {
    id: INTEGER AUTO_INCREMENT,
    product_id: INTEGER NOT NULL,
    user_id: INTEGER,
    title: VARCHAR(255) NOT NULL,
    text: MEDIUMTEXT NOT NULL,
    rating_overall: INTEGER NOT NULL,
    doesRecommend: BOOLEAN NOT NULL,
    rating_size: INTEGER NOT NULL,
    rating_width: INTEGER NOT NULL,
    rating_comfort: INTEGER NOT NULL,
    rating_quality: INTEGER NOT NULL,
    isHelpful: INTEGER NOT NULL DEFAULT 0,
    isNotHelpful: INTEGER NOT NULL DEFAULT 0,
    created_At: DATETIME DEFAULT now(),
    uploaded_At: DATETIME,
    user_nickname: VARCHAR(255) NOT NULL,
    user_verified: BOOLEAN NOT NULL DEFAULT false,
    user_email_auth: VARCHAR(255) NOT NULL,
  }
)
