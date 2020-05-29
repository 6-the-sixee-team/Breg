drop database if exists adidas_fec;
create database adidas_fec;
use adidas_fec;

CREATE TABLE `Reviews` (
  `review_id` INTEGER AUTO_INCREMENT,
  `product_id` INTEGER NOT NULL,
  `user_id` INTEGER,
  `title` VARCHAR(255) NOT NULL,
  `text` MEDIUMTEXT NOT NULL,
  `doesRecommend` BOOLEAN NOT NULL,
  `created_At` DATETIME DEFAULT now(),
  PRIMARY KEY (`review_id`),
  FOREIGN KEY (user_id) REFERENCES Users (user_id),
  FOREIGN KEY (product_id) REFERENCES Products (product_id)
);

CREATE TABLE `Users` (
  `users_id` INTEGER AUTO_INCREMENT,
  `nickname` VARCHAR(255),
  `email` VARCHAR(255),
  PRIMARY KEY (`id`)
);

CREATE TABLE `Products` (
  `products_id` INTEGER AUTO_INCREMENT,
  `name` VARCHAR(255),
  `description` VARCHAR(255),
  `rating_overall` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);


-- FOREIGN KEY (category) REFERENCES categoryInfo(categoryId)
-- look into tinyint smallint sizes
-- check to see if references need quotes