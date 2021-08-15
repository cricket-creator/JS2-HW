const express = require('express');
const fs = require('fs');
const cartRouter = require('./cartRouter');
const app = express();

app.use(express.json());
app.use(express.static('.'));
app.use('/api/cart', cartRouter);

app.get('/api/products', (req, res) => {
  fs.readFile('server/data/catalog.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));