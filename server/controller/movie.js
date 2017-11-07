const request = require('request-promise');
const Promise = require('bluebird');

module.exports.fetchMovies = (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
  request.get('https://api.douban.com/v2/movie/coming_soon?count=100')
    .then(body => {
      res.send(body);
    })
    .catch(err => {
      console.log('error in fetchMovies promise chain: ', err);
      res.sendStatus(400);
    });
};

module.exports.fetchPoster = (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
  const link = req.query.link;
  request({ uri: link, resolveWithFullResponse: true, encoding: 'binary' })
    .then(response => {
      let prefix = `data:${response.headers['content-type']};base64,`;
      let base64 = Buffer.from(response.body, 'binary').toString('base64');
      res.send(JSON.stringify(prefix + base64));
    }) 
    .catch(err => {
      console.log('error fetching poster: ', err);
      res.sendStatus(400);
    });
};

module.exports.fetchMoviesWithKeyword = (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
  request({ 
    uri: 'https://api.douban.com/v2/movie/search', 
    qs: { q: req.query.keyword }
  })
    .then(body => {
      res.send(body);
    })  
    .catch(err => {
      console.log('err when fetching movie with keyword: ', err);
      res.sendStatus(400);
    });
};