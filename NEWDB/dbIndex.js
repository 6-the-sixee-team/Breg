/* eslint-disable no-console */
const { Client } = require('pg');

const client = new Client({
  //'52.15.45.195'
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'reviews',
});
// 'postgres:postgres:@localhost:5432/reviews'

client.connect((err) => {
  if (err) {
    console.log('ERROR postgres', err);
  } else {
    console.log('Connected successfuly to postgres reviews');
  }
});


module.exports = client;
