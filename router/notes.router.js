const express = require('express');
const router = express.Router();
const data = require('../db/notes');
const simDB = require('../db/simDB');  // <<== add this
const notes = simDB.initialize(data); // <<== and this

router.put('/notes/:id', (req, res, next) => {
  const id = req.params.id;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateFields = ['title', 'content'];

  updateFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  notes.update(id, updateObj, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    } else {
      next();
    }
  });
});

router.post('/notes', (req, res, next) => {
  const { title, content } = req.body;

  const newItem = { title, content };
  /***** Never trust users - validate input *****/
  if (!newItem.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  notes.create(newItem, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.location(`http://${req.headers.host}/notes/${item.id}`).status(201).json(item);
    } else {
      next();
    }
  });
});

router.delete('/notes/:id', (req, res) => {
  const { id } = req.params;

  notes.delete(id, (err) => {
    if (err) {
      return next(err);
    }
    res.status(204).end();
  });
})

router.get('/notes/:id', (req, res, next) => {
  const { id } = req.params;

  notes.find(id)
    .then(item => {
      if (item) {
        res.json(item);
      }
      next();
    })
    .catch(err => {
      next(err)
    });
});

//No longer using testLogger - now using morgan
//app.use(testLogger);
//app.use(morgan('dev'))

router.get('/notes', (req, res, next) => {
  const { searchTerm } = req.query;

  notes.filter(searchTerm, (err, list) => {
    if (err) {
      return next(err); // goes to error handler
    }
    res.json(list); // responds with filtered array
  });
});

router.get('/boom', (req, res, next) => {
  throw new Error('Boom!!');
});

module.exports = router;
