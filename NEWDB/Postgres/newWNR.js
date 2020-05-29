const faker = require('faker');
const fs = require('fs');
const v8 = require('v8');


const checkMemoryNative = () => {
  console.log('Memory Usage: ', process.memoryUsage());
};

const printHeapStats = () => {
  console.log('Heap Status', v8.getHeapSpaceStatistics());
};


const writeProduct = () => {
  const productName = faker.commerce.productName();
  const description = faker.lorem.sentence();
  // const rating = ( (Math.random() * 4).toFixed(2));
  const rating = ((Math.random() * (4)) + 1).toFixed(2);
  const query = `${productName}, ${description}, ${rating}\n`;
  return query;
};

const writeUser = () => {
  const nickname = faker.internet.userName();
  const email = faker.internet.email();
  const query = `${nickname}, ${email}\n`;
  return query;
};

const writeReview = () => {
  const product = faker.random.number({
    'min': 1,
    'max': 1000
  });
  const user = faker.random.number({
    'min': 1,
    'max': 500
  });
  const title = faker.commerce.productAdjective();
  const text = faker.lorem.sentence();
  const doesRecommend = faker.random.boolean();
  const created = faker.date.between('2020-01-01', '2020-05-05').toString().replace(/G.+/g, 'PST');
  const query = `${product}, ${user}, ${title}, ${text}, ${doesRecommend}, ${created}\n`;
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


const writeStreamProduct = fs.createWriteStream('./NEWDB/Postgres/Data/products.txt');
const writeStreamUser = fs.createWriteStream('./NEWDB/Postgres/Data/users.txt');
const writeStreamReview = fs.createWriteStream('./NEWDB/Postgres/Data/reviews.txt');
// const line1 = 'Test\n';
// writeStream.write(line1);

writeNTimes(writeStreamProduct, 100000, writeProduct, ()=>{
  console.log('written!');
});

writeNTimes(writeStreamUser, 50000, writeUser, ()=>{
  console.log('written!');
});

writeNTimes(writeStreamReview, 10000000, writeReview, ()=>{
  console.log('written!');
});
