const {DATABASE} = require('../config');
const knex = require('knex')(DATABASE);

// -- Different Queries
// -- SELECT * FROM notes;
// -- SELECT * FROM notes LIMIT 5;
// -- SELECT title FROM notes ORDER BY title ASC;
// -- SELECT title FROM notes ORDER BY title DESC;
// -- SELECT title FROM notes WHERE title = '7 things lady gaga has in common with cats';
// -- SELECT title FROM notes WHERE title::text LIKE '%ways%';
// -- UPDATE notes
// --   SET title = '5 life lessons learned by dogs'
// --   WHERE id = 1;
// -- UPDATE notes
// --   SET content = 'TEST CONTENT'
// --   WHERE id = 1;
// -- INSERT INTO notes
// --   (title, content)
// --   VALUES
// --   ('testNoteTitle',
// --     'testNoteContent'
// --   );
// -- DELETE FROM notes WHERE id = 11;

knex.select().table('notes')
  .then(results => console.log(results));
// knex.select().from('notes').limit(5)
//   .then(results => console.log(results));
// knex.select().from('notes').orderBy('title', 'desc')
//   .then(results => console.log(results));
// knex.select().from('notes').orderBy('title', 'asc')
//   .then(results => console.log(results));
// knex.select().from('notes').where('title', '7 things lady gaga has in common with cats')
//   .then(results => console.log(results));
// knex.select().table('notes').where('title', 'like', '%ways%')
//   .then(results => console.log(results));
// knex('notes')
//   .update('title', '5 life lessons learned by dogs')
//   .where('id', 1000)
//   .then(console.log);
// knex('notes')
//   .update('content', 'TEST CONTENT')
//   .where('id', 1000)
//   .then(console.log);
// knex('notes')
//   .insert({ title: 'testTitle', content: 'testContent'})
//   .returning(['id', 'title', 'content'])
//   .then(console.log);
// knex('notes')
//   .where('id', 1014)
//   .del()
//   .then(console.log);no
