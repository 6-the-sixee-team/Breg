/* eslint-disable camelcase */
var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

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
var Review = mongoose.model('Review', reviewSchema);

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
var Product = mongoose.model('Product', productSchema);

var userSchema = Schema({
  user_id: {
    type: Number,
    unique: true
  },
  nickname: String,
  email: String,
  reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}]
});
var User = mongoose.model('User', userSchema);



let ReviewsModel = mongoose.model('Review', schema);

// var schema = mongoose.Schema({
//   id: {
//     type: Number,
//     unique: true
//   },
//   name: String,
//   rating_overall: Number,
//   reviews: [
//     {
//       id: Number,
//       title: String,
//       text: String,
//       doesRecommend: Boolean,
//       created_At: Date,
//       user: {
//         id: number,
//         nickname: String,
//       }
//     }
//   ]
// });