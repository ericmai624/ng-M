const request = require('request-promise');
const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const chalk = require('chalk');

const config = require('config')['themoviedb'];

const readFileAsync = Promise.promisify(fs.readFile);

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
      year: (new Date()).getFullYear()
    }
  };

  request(options)
    .then((body) => res.send(body))
    .catch((err) => console.log('error in fetch movies promise chain: ', err));
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

module.exports.fetchPoster = (req, res) => {
  const link = req.query.link;

  if (link === 'null') {
    return res.sendStatus(400);
  }

  readFileAsync(path.join(__dirname + '/../../worker/config.txt'))
    .then((file) => {
      let configuration = JSON.parse(file);
      let uri = configuration.images.secure_base_url
              + configuration.images.poster_sizes[4]
              + link
      ;
      let resolveWithFullResponse = true;
      let encoding = 'binary';
      return request({ uri, resolveWithFullResponse, encoding });
    })
    .then(response => {
      let prefix = `data:${response.headers['content-type']};base64,`;
      let base64 = Buffer.from(response.body, 'binary').toString('base64');
      res.send(JSON.stringify(prefix + base64));
    })
    .catch(err => {
      console.log(chalk.red('error fetching poster: ', err));
      res.sendStatus(404);
    });
};