const request = require('request-promise');
const Promise = require('bluebird');
const config = require('config')['themoviedb'];

module.exports.fetchMovies = (req, res) => {
  const options = {
    uri: `${config.hostname}/3/discover/movie`,
    qs: {
      api_key: config.apiKey,
      language: 'en-US',
      region: 'US',
      sort_by: 'popularity.desc',
      include_adult: false,
      page: 1,
      year: 2017
    }
  };

  Promise.all([
    request(options),
    request.get(`${config.hostname}/3/configuration`, { qs: { api_key: config.apiKey } })
  ])
    .then(([data, configuration]) => {
      let movies = JSON.parse(data);
      let configObj = JSON.parse(configuration);
      movies.images = configObj.images;
      res.send(movies);
    })
    .catch((err) => {
      console.log('error in fetch movies promise chain: ', err);
    })
  ;
};

module.exports.fetchMoviesWithKeyword = (req, res) => {
  const options = {
    uri: `${config.hostname}/3/search/movie`,
    qs: {
      api_key: config.apiKey,      
      query: req.query.keyword,
      include_adult: false
    }    
  };

  request(options)
    .then(body => {
      res.send(body);
    })  
    .catch(err => {
      console.log('err when fetching movie with keyword: ', err);
      res.sendStatus(400);
    })
  ;
};

/* Not necessary for now
module.exports.fetchPoster = (req, res) => {
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
*/