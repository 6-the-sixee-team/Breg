const faker = require('faker');
const fs = require('fs');
const path = require('path');

/* eslint-disable camelcase */
var mongoose = require ('mongoose');
var Schema = mongoose.Schema;
//new schema ?
var reviewSchema = Schema({
  id: {
    type: Number,
    unique: true
  },
  title: String,
  text: String,
  rating_overall: Number,
  doesRecommend: Number,
  created_At: Date,
  product_id: {type: Schema.Types.ObjectId, ref: 'Product'},
  user: {type: Schema.Types.ObjectId, ref: 'User'}
});
let ReviewModel = mongoose.model('Review', reviewSchema);

var productSchema = Schema({
  product_id: {
    type: Number,
    unique: true
  },
  name: String,
  description: String,
  rating_overall: Number,
  reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}]
});

let ProductModel = mongoose.model('Product', productSchema);

var userSchema = Schema({
  user_id: {
    type: Number,
    unique: true
  },
  nickname: String,
  email: String,
  reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}]
});

let UserModel = mongoose.model('User', userSchema);


const fileContent = `
  use reviews;
  db.dropDatabase();
  use reviews;

  db.createCollection(products);
  db.createCollection(users);
  db.createCollection(reviews);

  db.name.insert({
    ${key}: ${val},
    ${key}: ${val}
  });


`;

// create 5 random products
for (let i = 1; i <= 5; i++) {
  const productName = faker.commerce.productName();
  const description = faker.lorem.sentence();
  const rating = (Math.random() * 5).toFixed(2);
  //insert many ?
  const query = `ProductModel.create({
    name: ${productName},
    description: ${description},
    rating_overall: ${rating},
    reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}]
  }) \n`;

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
  const query = `ProductModel.create({
    nickname: ${nickname},
    email: ${email},
    reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}]
  }) \n`;

  if (i < 5) {
    fileContent += `${query}\n`;
  } else {
    fileContent += `${query}\n\n\n\n`;
  }
}




