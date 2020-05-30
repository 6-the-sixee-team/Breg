const express = require('express');
const bodyParser = require('body-parser');
const db = require('./dbindex.js');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.static(`${__dirname}/..client/dist`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const filePath = path.join(__dirname, '/example.js');

app.get('/data', (req, res) => {
  const queryStr = 'SELECT * FROM reviews WHERE product_id=3 AND user_id=4;';

  db.query(queryStr, (err, result) => {
    if (err) {
      res.send(`ERROR, ${err}`);
    } else {
      res.send(result.rows);
      // fs.writeFile(filePath, result.rows.toString(), (err) => {
      //   if (err) {
      //     console.log('err writing schema', err);
      //   } else {
      //     console.log('file saved with mock data');
      //   }
      // });
    }
  });
});

app.listen(3002, () => {
  console.log('SERVER LISTENING on port 3002');
});
