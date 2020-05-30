const express = require('express');
const bodyParser = require('body-parser');
const db = require('../NEWDB/dbindex.js');
const path = require('path');
const app = express();

app.use(express.static(`${__dirname}/..client/dist`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const filePath = path.join(__dirname, '/example.js');

app.get('/api/product/:id/reviews', (req, res) => {
  console.log(req.params.id);
  const queryStr = `SELECT reviews.created_At, reviews.rating, reviews.title, reviews.text, users.nickname FROM reviews, users WHERE reviews.product_id=${req.params.id} AND reviews.user_id = users.user_id ORDER BY reviews.created_At desc;`;

  db.query(queryStr, (err, result) => {
    if (err) {
      res.send(`ERROR, ${err}`);
    } else {
      res.send(result.rows);
    }
  });
});

app.listen(3002, () => {
  console.log('SERVER LISTENING on port 3002');
});
