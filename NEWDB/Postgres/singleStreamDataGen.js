const faker = require('faker');
const fs = require('fs');
const v8 = require('v8');

let fileContent = `

  DROP DATABASE IF EXISTS reviews;

  CREATE DATABASE reviews;
  \\c reviews;

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


`;

const finalContent = `
ALTER TABLE reviews ADD FOREIGN KEY (user_id) REFERENCES users (user_id);
ALTER TABLE reviews ADD FOREIGN KEY (product_id) REFERENCES products (product_id);
CREATE INDEX ON reviews (product_id);
`;

const checkMemoryNative = () => {
  console.log('Memory Usage: ', process.memoryUsage());
};

const printHeapStats = () => {
  console.log('Heap Status', v8.getHeapSpaceStatistics());
};


const writeProduct = () => {
  const productName = faker.commerce.productName();
  const description = faker.lorem.sentence();
  const rating = (Math.random() * 5).toFixed(2);
  const query = `INSERT INTO products (name, description, rating_overall) values ('${productName}', '${description}', ${rating}); \n`;
  return query;
};

const writeUser = () => {
  const nickname = faker.internet.userName();
  const email = faker.internet.email();
  const query = `INSERT INTO users (nickname, email) values ('${nickname}', '${email}');\n`;
  return query;
};

const writeReview = () => {
  const product = Math.ceil(Math.random() * 1000);
  const user = Math.ceil(Math.random() * 500);
  const title = faker.commerce.productAdjective();
  const text = faker.lorem.sentence();
  const doesRecommend = faker.random.boolean();
  const created = faker.date.between('2020-01-01', '2020-05-05').toString().replace(/G.+/g, 'PST');
  const query = `INSERT INTO reviews (product_id, user_id, title, text, doesRecommend, created_At) values ('${product}', '${user}', '${title}', '${text}', '${doesRecommend}', '${created}'); \n`;
  return query;
};

writeNTimes = (writer, times, fn, callback) => {
  const writeFile = () => {
    let ok = true;
    do {
      times--;
      const data = fn();
      if (times === 0) {
        writer.write(data, 'utf-8', callback);
      } else {
        ok = writer.write(data, 'utf-8');
        if (!ok) {
          checkMemoryNative();
        }
      }
    } while (times > 0 && ok);
    if (times > 0) {
      writer.once('drain', writeFile);
    }
  };
  writeFile();
};


const writeStream = fs.createWriteStream('./postgres.sql');
// const line1 = 'Test\n';
// writeStream.write(line1);
writeStream.write(fileContent);
writeNTimes(writeStream, 1000, writeProduct, ()=>{
  console.log('written!');
});
writeStream.write('\n\n\n\n\n');
writeNTimes(writeStream, 500, writeUser, ()=>{
  console.log('written!');
});
writeStream.write('\n\n\n\n\n');
writeNTimes(writeStream, 10000000, writeReview, ()=>{
  writeStream.write(finalContent);
  console.log('written!');
});
// writeStream.write(finalContent);
