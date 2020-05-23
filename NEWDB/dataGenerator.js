const faker = require('faker');
const fs = require('fs');
const path = require('path');

let fileContent = `

  DROP DATABASE IF EXISTS reviews;

  CREATE DATABASE reviews;
  \\c reviews;

  CREATE TABLE users (
    user_id SERIAL,
    nickname VARCHAR,
    email VARCHAR,
    PRIMARY KEY (user_id)
  );

  CREATE TABLE products (
    product_id SERIAL,
    name VARCHAR,
    description VARCHAR,
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
    PRIMARY KEY (review_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (product_id) REFERENCES products (product_id)
  );


`;



// create 5 random products
for (let i = 1; i <= 5; i++) {
  const productName = faker.commerce.productName();
  const description = faker.lorem.sentence();
  const rating = (Math.random() * 5).toFixed(2);
  const query = `INSERT INTO products (name, description, rating_overall) values ('${productName}', '${description}', ${rating}); \n`;

  if (i < 5) {
    fileContent += `${query}\n`;
  } else {
    fileContent += `${query}\n\n\n\n`;
  }
}

// create 5 random users
for (let i = 1; i <= 5; i++) {
  const nickname = faker.internet.userName();
  const email = faker.internet.email();
  const query = `INSERT INTO users (nickname, email) values ('${nickname}', '${email}');`;

  if (i < 5) {
    fileContent += `${query}\n`;
  } else {
    fileContent += `${query}\n\n\n\n`;
  }
}


// create 5 random reviews
//.toString().replace(/(GMT-\d\d\d\d)|\(|\)/g, '')
for (let i = 1; i <= 1000000; i++) {
  const product = Math.ceil(Math.random() * 5);
  const user = Math.ceil(Math.random() * 5);
  const title = faker.commerce.productAdjective();
  const text = faker.lorem.sentence();
  const doesRecommend = faker.random.boolean();
  const created = faker.date.between('2020-01-01', '2020-05-05').toString().replace(/G.+/g, 'PST');
  const query = `INSERT INTO reviews (product_id, user_id, title, text, doesRecommend, created_At) values ('${product}', '${user}', '${title}', '${text}', '${doesRecommend}', '${created}');`;

  fileContent += `${query}\n`;
}


const filePath = path.join(__dirname, '/schema.sql');
fs.writeFile(filePath, fileContent, (err) => {
  if (err) {
    console.log('err writing schema', err);
  } else {
    console.log('file saved with mock data');
  }
});
