const DATABASE = process.env.DATABASE_URL || 'postgres://localhost:5432/noteful-app';

exports.DATABASE = {
  client: 'pg',
  connection: DATABASE,
  pool: {min : 0 , max : 3},
  debug: true
};

module.exports.PORT = 8080;
