'use strict';

// Load array of notes

console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...

const express = require('express');

const data = require('./db/notes');

const app = express();

// ADD STATIC SERVER HERE

app.use(express.static('public'));

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  const answer = data.find(item => item.id === Number(id));
  res.json(answer);
});

app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
