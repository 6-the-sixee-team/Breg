DROP DATABASE IF EXISTS reviews;

  CREATE DATABASE reviews;
  \c reviews;

  CREATE TABLE users (
    user_id SERIAL,
    nickname VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    PRIMARY KEY (user_id)
  );

  CREATE TABLE products (
    product_id SERIAL,
    name VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    rating_overall DECIMAL NOT NULL,
    PRIMARY KEY (product_id)
  );

  CREATE TABLE reviews (
    review_id SERIAL,
    product_id SMALLINT NOT NULL,
    user_id SMALLINT NOT NULL,
    title VARCHAR NOT NULL,
    text VARCHAR NOT NULL,
    doesRecommend BOOLEAN NOT NULL,
    created_At DATE NOT NULL,
    PRIMARY KEY (review_id)
  );

  COPY users (nickname, email) FROM '/Users/bregbromley/Desktop/SDC/reviews-module/NEWDB/Postgres/Data/users.txt' WITH DELIMITER ',';
  COPY products (name, description, rating_overall) FROM '/Users/bregbromley/Desktop/SDC/reviews-module/NEWDB/Postgres/Data/products.txt' WITH DELIMITER ',';
  COPY reviews (product_id, user_id, title, text, doesRecommend, created_At) FROM '/Users/bregbromley/Desktop/SDC/reviews-module/NEWDB/Postgres/Data/reviews.txt' WITH DELIMITER ',';

  ALTER TABLE reviews ADD FOREIGN KEY (user_id) REFERENCES users (user_id);
  ALTER TABLE reviews ADD FOREIGN KEY (product_id) REFERENCES products (product_id);
  CREATE INDEX ON users (nickname);
  CREATE INDEX ON reviews (product_id);
