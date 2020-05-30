const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/test';
const faker = require("faker");

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

var reviewSchema = mongoose.Schema({
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
let Review = mongoose.model('Review', reviewSchema);

//need to fix
async function seed() {
  for (let i = 0; i < 10000000; i++) {
    let name = faker.commerce.productName();
    let image = faker.image.imageUrl();
    let price = faker.commerce.price();
    let dateCreated = faker.date.past();
    let categoryName = faker.random.word();
​
    //console.log(name);
    //console.log(image);
​
    let item = new Review({
      productName: `${name}`,
      productPrice: `${price}`,
      productImageURL: `${image}`,
      dateCreated: `${dateCreated}`,
      categoryName: `${categoryName}`
    });
​
    //console.log(item);
​
    await item.save((err, res) => {
      if(err) {
        //console.log(err);
        console.log("error");
      } else {
        console.log(res);
        console.log("success");
      }
    });
  }
}
seed();