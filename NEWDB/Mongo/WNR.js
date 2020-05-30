const faker = require('faker');
const fs = require('fs');
const v8 = require('v8');

const fileContent = `
  use reviews;
  db.dropDatabase();
  use reviews;

  db.createCollection('products');
  db.createCollection('users');
  db.createCollection('reviews');



`;


const checkMemoryNative = () => {
  console.log('Memory Usage: ', process.memoryUsage());
};

const printHeapStats = () => {
  console.log('Heap Status', v8.getHeapSpaceStatistics());
};


const writeProduct = (i) => {
  const productName = faker.commerce.productName();
  const description = faker.lorem.sentence();
  const rating = (Math.random() * 5).toFixed(2);
  const query = `
    db.products.insert({
      _id: ${i},
      name: '${productName}',
      description: '${description}',
      rating: ${rating}
    })\n
  `;
  return query;
};

const writeUser = (i) => {
  const nickname = faker.internet.userName();
  const email = faker.internet.email();
  const query = `
  db.users.insert({
    _id: ${i},
    nickname: '${nickname}',
    email: '${email}',
  })\n
`;
  return query;
};

const writeReview = () => {
  const product = Math.ceil(Math.random() * 100);
  const user = Math.ceil(Math.random() * 50);
  const title = faker.commerce.productAdjective();
  const text = faker.lorem.sentence();
  const doesRecommend = faker.random.boolean();
  const created = faker.date.between('2020-01-01', '2020-05-05').toString().replace(/G.+/g, 'PST');
  const query = `
    db.reviews.insert({
      product: ${product},
      user: ${user},
      title: '${title}',
      text: '${text}',
      doesRecommend: ${doesRecommend},
      created: '${created}'
    })\n

  `;
  return query;
};

writeNTimes = (writer, times, fn, callback) => {
  const writeFile = () => {
    let ok = true;
    do {
      times--;
      const data = fn(times + 1);
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


const writeStream = fs.createWriteStream('./mongoTest.js');
// const line1 = 'Test\n';
// writeStream.write(line1);
writeStream.write(fileContent);
writeNTimes(writeStream, 100, writeProduct, ()=>{
  console.log('written!');
});
writeStream.write('\n\n\n\n\n');
writeNTimes(writeStream, 50, writeUser, ()=>{
  console.log('written!');
});
writeStream.write('\n\n\n\n\n');
writeNTimes(writeStream, 1000, writeReview, ()=>{
  console.log('written!');
});
