// server flow: index.js -> routes -> controller -> model -> db-mysql
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const db = require('../NEWDB/dbindex.js');
const nr = require('newrelic');

// const middleware = require('./middleware.js');
// const router = require('./routes.js');

const app = express();
const PORT = process.env.REVIEWSPORT || 3003;
app.set('port', PORT);

// app.use(bodyParser.json());
// app.use(morgan('dev'));
app.use(express.json());
// app.use(middleware.httpRequestLogger);
app.use(cors());

// app.get('/api', (req, res) => {
//   console.log('hello inside get route');
//   res.send('response sent correctly!');
// });
app.get('/hi', (req, res) => {
  res.send('hi');
});

app.get('/api/product/:id/reviews', (req, res) => {
  // console.log(req.params.id);
  const queryStr = `SELECT reviews.created_At, reviews.rating, reviews.title, reviews.text, users.nickname FROM reviews, users WHERE reviews.product_id=${req.params.id} AND reviews.user_id = users.user_id ORDER BY reviews.created_At desc;`;

  db.query(queryStr, (err, result) => {
    if (err) {
      res.send(`ERROR, ${err}`);
    } else {
      let first2 = [result.rows[0], result.rows[1]];
      res.send(first2);
    }
  });
});

// app.use('/api/models', router);

app.use(express.static(path.join(__dirname, '../client', 'dist')));

app.listen(app.get('port'), () =>
  console.log('Listening on port: ' + app.get('port')));
