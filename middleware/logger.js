const testLogger = function(req, res, next) {
  const now = new Date();
  console.log(`${now.toLocaleString()} ${req.method} ${req.url}`);
  next();
}

module.exports = testLogger;

//toLocaleString
