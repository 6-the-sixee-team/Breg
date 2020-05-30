const faker = require('faker');
const fs = require('fs');
const v8 = require('v8');

const checkMemoryNative = () => {
  console.log('Memory Usage: ', process.memoryUsage());
};

const printHeapStats = () => {
  console.log('Heap Status', v8.getHeapSpaceStatistics());
};

let products = [];
for (let i = 1; i <= 10; i++) {
  let obj = {
    name: faker.commerce.productName(),
    description: faker.lorem.sentence(),
    rating: ((Math.random() * (4)) + 1).toFixed(2)
  };
  products.push(obj);
}

let users = [];
for (let i = 1; i <= 5; i++) {
  let obj = {
    _id: i,
    nickname: faker.internet.userName(),
    email: faker.internet.email()
  };
  users.push(obj);
}

let reviews = [];
for (let i = 1; i <= 100; i++) {
  let obj = {
    product: Math.ceil(Math.random() * 100),
    user: Math.ceil(Math.random() * 50),
    title: faker.commerce.productAdjective(),
    text: faker.lorem.sentence(),
    doesRecommend: faker.random.boolean(),
    created: faker.date.between('2020-01-01', '2020-05-05').toString().replace(/G.+/g, 'PST')
  };
  reviews.push(obj);
}

const fileContent = `
  use reviews;
  db.dropDatabase();
  use reviews;

  db.createCollection('products');
  db.createCollection('users');
  db.createCollection('reviews');

  db.products.insertMany(${JSON.stringify(products)});
  db.users.insertMany(${JSON.stringify(users)});
  db.reviews.insertMany(${JSON.stringify(reviews)});
`;



writeNTimes = (writer, times, content, callback) => {
  const writeFile = () => {
    let ok = true;
    do {
      times--;
      const data = fn(times + 1);
      if (times === 0) {
        writer.write(content, 'utf-8', callback);
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


const writeStream = fs.createWriteStream('./NEWDB/Mongo/Data/mongoTest.js');
// const line1 = 'Test\n';
// writeStream.write(line1);
writeStream.write(fileContent);

