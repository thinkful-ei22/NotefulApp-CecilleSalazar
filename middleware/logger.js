const testLogger = function() {
  const now = new Date();
  console.log(`${now.toLocaleString()} ${req.method} ${req.url}`);
  next();
}

module.exports = testLogger;

//toLocaleString
