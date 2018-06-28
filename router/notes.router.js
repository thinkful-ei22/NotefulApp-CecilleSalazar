const express = require('express');
const router = express.Router();
const data = require('../db/notes');
const simDB = require('../db/simDB');  // <<== add this
const notes = simDB.initialize(data); // <<== and this

//Successfully Converted and Tested
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

  notes.update(id, updateObj)
    .then(item => {
      if (item) {
        res.json(item);
      }
      next();
    })
    .catch(err => {
      next(err);
    })
});

//Successfully Converted and Tested!
router.post('/notes', (req, res, next) => {
  const { title, content } = req.body;

  const newItem = { title, content };
  /***** Never trust users - validate input *****/
  if (!newItem.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  notes.create(newItem)
    .then(item => {
      if (item) {
        res.location(`http://${req.headers.host}/notes/${item.id}`).status(201).json(item);
      }
      next();
    })
    .catch(err => {
      return next(err);
    });
});

//Successfully Converted and Tested
router.delete('/notes/:id', (req, res, next) => {
  const id = req.params.id;

  notes.delete(id)
    .then(item => res.sendStatus(204))
    .catch(err => {
      next(err)
    });
});

//Successfully Converted and Tested
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

//Successfully Converted and Tested
router.get('/notes', (req, res, next) => {
  const { searchTerm } = req.query;

  notes.filter(searchTerm)
    .then(notes => res.json(notes))
    .catch(err => {
      next(err)
    });
});

router.get('/boom', (req, res, next) => {
  throw new Error('Boom!!');
});

module.exports = router;
