const axios = require('axios');

module.exports.fetchMovies = (req, res) => {
  axios.get('https://api.douban.com/v2/movie/coming_soon')
    .then(response => {
      res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
      res.send(response.data);
    })
    .catch(err => {
      process.stdout.write(err);
      res.sendStatus(500);
    });
};