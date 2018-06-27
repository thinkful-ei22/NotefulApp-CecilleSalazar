'use strict';

// Load array of notes

console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...

const express = require('express');
const morgan = require('morgan');
const noteRouter = require('./router/notes.router');

// Simple In-Memory Database
// const data = require('./db/notes');
// const simDB = require('./db/simDB');  // <<== add this
// const notes = simDB.initialize(data); // <<== and this

const app = express();

const { PORT } = require('./config');

//Commenting out testLogger - we are now on morgan
//const testLogger = require('./middleware/logger')

// ADD STATIC SERVER HERE

app.use(express.static('public'));

app.use(express.json());

app.use('/api/notes', noteRouter);

// app.put('/api/notes/:id', (req, res, next) => {
//   const id = req.params.id;
//
//   /***** Never trust users - validate input *****/
//   const updateObj = {};
//   const updateFields = ['title', 'content'];
//
//   updateFields.forEach(field => {
//     if (field in req.body) {
//       updateObj[field] = req.body[field];
//     }
//   });
//
//   notes.update(id, updateObj, (err, item) => {
//     if (err) {
//       return next(err);
//     }
//     if (item) {
//       res.json(item);
//     } else {
//       next();
//     }
//   });
// });
//
// app.get('/api/notes/:id', (req, res, next) => {
//   const { id } = req.params;
//
//   notes.find(id, (err, item) => {
//     if (err) {
//       return next(err);
//     }
//     res.json(item);
//   });
// });
//
// //No longer using testLogger - now using morgan
// //app.use(testLogger);
app.use(morgan('dev'))
//
// app.get('/api/notes', (req, res, next) => {
//   const { searchTerm } = req.query;
//
//   notes.filter(searchTerm, (err, list) => {
//     if (err) {
//       return next(err); // goes to error handler
//     }
//     res.json(list); // responds with filtered array
//   });
// });
//
// app.get('/boom', (req, res, next) => {
//   throw new Error('Boom!!');
// });
//
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
