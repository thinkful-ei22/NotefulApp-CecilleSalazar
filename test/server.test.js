
const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Reality check', function () {

  it('true should be true', function () {
    expect(true).to.be.true;
  });

  it('2 + 2 should equal 4', function () {
    expect(2 + 2).to.equal(4);
  });
});

describe('Express static', function () {

  it('GET request "/" should return the index page', function () {
    return chai.request(app)
      .get('/')
      .then(function (res) {
        expect(res).to.exist;
        expect(res).to.have.status(200);
        expect(res).to.be.html;
      });
  });
});

describe('404 handler', function () {

  it('should respond with 404 when given a bad path', function () {
    return chai.request(app)
      .get('/DOES/NOT/EXIST')
      .then(res => {
        expect(res).to.have.status(404);
      });
  });
});

describe('GET request should return all notes', function() {
  it ('should return 10 default notes as an array', function() {
    return chai.request(app)
      .get('/api/notes')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.be.at.least(10);
      });
    });

    it('should return a list with the correct right fields', function () {
      return chai.request(app)
        .get('/api/notes')
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.length(10);
          res.body.forEach(function (note) {
            expect(note).to.be.a('object');
            expect(note).to.include.keys('id', 'title', 'content');
          });
        });
    });

    it('should return correct search results for a valid query', function() {
      return chai.request(app)
        .get('/api/notes?searchTerm=gaga')
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.length(1);
          expect(res.body[0]).to.be.an('object');
        });
    });

    it ('should return an empty array for an incorrect query', function() {
      return chai.request(app)
        .get('/api/notes?searchTerm=Hello%20Kitty')
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.length(0);
        })
    })
})

describe('GET api/notes/:id', function() {
  it ('should return correct note object with id, title and content for a given id', function() {
    return chai.request(app)
      .get('/api/notes/1000')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body).to.include.keys('id', 'title', 'content');
        expect(res.body.id).to.equal(1000);
        expect(res.body.title).to.equal('5 life lessons learned from cats');
      })
  })

  it('should respond with a 404 for an invalid id', function () {
      return chai.request(app)
        .get('/api/notes/DOES/NOT/EXIST')
        .catch(err => err.response)
        .then(res => {
          expect(res).to.have.status(404);
        });
    });
})

describe('POST api/notes', function() {
  it ('should create and return a new item with location header when provided valid data', function() {
    const newNote = { title: 'Why do cats eat grass?', content: 'Posuere sollicitudin aliquam ultrices sagittis orci a.'}
    return chai.request(app)
      .post('/api/notes')
      .send(newNote)
      .then(function(res) {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.include.keys('id', 'title', 'content');
        expect(res.body.id).to.equal(1010);
        expect(res.body.title).to.equal(newNote.title);
        expect(res.body.content).to.equal(newNote.content);
        expect(res).to.have.header('location');
      });
  })

  it('should return an error when missing "title" field', function () {
    const missingTitle = {content: 'Posuere sollicitudin aliquam ultrices sagittis orci a.'}
    return chai.request(app)
      .post('/api/notes')
      .send(missingTitle)
      .catch(err => err.response)
      .then(res => {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.equal('Missing `title` in request body');
        })
    })
})
