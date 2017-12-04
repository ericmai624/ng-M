const request = require('request-promise');
const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const chalk = require('chalk');
const jwt = require('jsonwebtoken');
const config = require('config');

const readFileAsync = Promise.promisify(fs.readFile);
const tmdb_apiHost = config.themoviedb.hostname || process.env.TMDB_API_HOST;
const tmdb_apiKey = config.themoviedb.apiKey || process.env.TMDB_API_KEY;
const fetchlab_url = config.fetchlab || process.env.FETCHLAB_URL;
const secret = config.jwt.secret || process.env.JWT_SECRET;

module.exports.fetchMovies = (req, res) => {
  const options = {
    uri: `${tmdb_apiHost}/3/movie/now_playing`,
    qs: {
      api_key: tmdb_apiKey,
      language: 'en-US',
      page: req.query.page,
    }
  };

  request(options)
    .then((body) => {
      res.send(body); // Send information to client first
    })
    .catch((err) => console.log(chalk.red('error in fetch movies promise chain: ' + err)));
};

module.exports.fetchMovieById = (req, res) => {
  const id = req.params.id;
  const options = {
    uri: `${tmdb_apiHost}/3/movie/${id}`,
    qs: {
      api_key: tmdb_apiKey,
      append_to_response: 'videos,credits'
    }
  };

  request(options) 
    .then(body => res.send(body))
    .catch(err => {
      console.log(chalk.red('error fetching movie with id: ', id, err));
      res.sendStatus(400);
    });
};

module.exports.fetchMoviesWithKeyword = (req, res) => {
  const options = {
    uri: `${tmdb_apiHost}/3/search/movie`,
    qs: {
      api_key: tmdb_apiKey,      
      query: req.query.keyword,
      include_adult: false
    }    
  };

  request(options)
    .then(body => {
      res.send(body);
    })  
    .catch(err => {
      console.log(chalk.red('err when fetching movie with keyword: ' + err));
      res.sendStatus(400);
    })
  ;
};

module.exports.readTMDBConfigFile = (req, res) => {
  readFileAsync(path.join(__dirname + '/../../worker/config.txt'))
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(chalk.red('error reading tmdb config.txt: ', err));
      res.sendStatus(500);
    });
};

module.exports.getRating = (req, res) => {
  const id = req.params.id;
  const origin = req.hostname;
  const token = jwt.sign({ origin }, secret, { expiresIn: 300 });
  const options = {
    uri: `${fetchlab_url}/api/rating/${id}`,
    headers: {
      authorization: `Bearer ${token}`
    }
  };
  
  request(options)
    .then((body) => {
      res.send(body);
    })
    .catch((err) => {
      res.sendStatus(400);
    });
};