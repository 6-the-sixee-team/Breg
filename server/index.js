// server flow: index.js -> routes -> controller -> model -> db-mysql
require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const db = require('../newdb/dbindex.js');


// const middleware = require('./middleware.js');
// const router = require('./routes.js');

const app = express();
const PORT = process.env.REVIEWSPORT || 3002;
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

app.use((req, res, next) => {
  console.log(`Incoming ${req.method} request to ${req.path}`);
  console.log(req.body);
  next();
});

app.get('/api/product/:id/reviews', (req, res) => {
  // console.log('GET REQUEST');
  const queryStr = `SELECT reviews.created_At, reviews.rating, reviews.title, reviews.text, users.nickname FROM reviews, users WHERE reviews.product_id=${req.params.id} AND reviews.user_id = users.user_id ORDER BY reviews.created_At desc;`;

  db.query(queryStr, (err, result) => {
    if (err) {
      res.status(400).send(`ERROR, ${err}`);
    } else {
      let first2 = [result.rows[0], result.rows[1]];
      res.status(200).send(first2);
    }
  });
});



// app.use('/api/models', router);

app.use(express.static(path.join(__dirname, '../client', 'dist')));

app.listen(app.get('port'), () =>
  console.log('Listening on port: ' + app.get('port')));
