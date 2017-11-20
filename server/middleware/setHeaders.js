const config = require('config')['cors'];

module.exports = (req, res, next) => {
  if (req.hostname === 'localhost') {
    res.set('Access-Control-Allow-Origin', config.url);
  }
  next();
};