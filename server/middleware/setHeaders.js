const config = require('config')['cors'];

module.exports = (req, res, next) => {
  res.set('Access-Control-Allow-Origin', config.url);
  next();
};