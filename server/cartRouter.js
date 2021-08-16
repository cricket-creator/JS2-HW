const express = require('express');
const fs = require('fs');
const router = express.Router();
const handler = require('./handlerModule');

router.get('/', (req, res) => {
  fs.readFile('server/data/cart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      res.send(data);
    }
  });
});

router.post('/', (req, res) => {
  handler(req, res, 'add', 'server/data/cart.json');
});

router.put('/:id', (req, res) => {
  handler(req, res, 'change', 'server/data/cart.json');
});

router.delete('/:id', (req, res) => {
  handler(req, res, 'remove', 'server/data/cart.json');
});

module.exports = router;