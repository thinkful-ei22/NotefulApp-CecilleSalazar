'use strict';

// Load array of notes

console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...

const express = require('express');

const data = require('./db/notes');

const app = express();

const { PORT } = require('./config');

const testLogger = require('./middleware/logger')

// ADD STATIC SERVER HERE

app.use(express.static('public'));

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  const answer = data.find(item => item.id === Number(id));
  res.json(answer);

});

app.use(testLogger);

app.get('/api/notes', (req, res) => {
  const query = req.query;
  const searchTerm = query.searchTerm;
  if (!searchTerm){
    return res.json(data);
  }
  const result = data.filter(item=>{
    if (item.title.includes(searchTerm)||item.content.includes(searchTerm)){
      return item;
    }
  });
  res.json(result);
});

app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
