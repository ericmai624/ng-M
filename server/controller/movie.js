const request = require('request-promise');
const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const cheerio = require('cheerio');
const chalk = require('chalk');

const config = require('config');

const readFileAsync = Promise.promisify(fs.readFile);
const tmdb_apiHost = config.themoviedb.hostname || process.env.TMDB_API_HOST;
const tmdb_apiKey = config.themoviedb.apiKey || process.env.TMDB_API_KEY;
const omdb_apiHost = config.omdb.hostname || process.env.OMDB_API_HOST;
const omdb_apiKey = config.omdb.apiKey || process.env.OMDB_API_KEY;

module.exports.fetchMovies = (req, res) => {
  const options = {
    uri: `${tmdb_apiHost}/3/movie/now_playing`,
    qs: {
      api_key: tmdb_apiKey,
      language: 'en-US',
      page: 1,
    }
  };

  request(options)
    .then((body) => res.send(body))
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

module.exports.fetchDoubanRating = (req, res) => {
  const id = req.params.id;
  const options = {
    uri: 'https://api.douban.com/v2/movie/search',
    qs: { q: id }
  };
  
  request(options)
    .then((body) => {
      const responseObj = JSON.parse(body);
      if (!responseObj.total || !responseObj.subjects.length) {
        return res.sendStatus(204);
      }
      const response = {};
      response.rating = responseObj.subjects[0].rating;
      response.id = responseObj.subjects[0].id;
      res.send(JSON.stringify(response));
    })
    .catch((err) => {
      chalk.red('err fetching douban details: ', err);
      res.sendStatus(400);
    });
};

module.exports.fetchOMDBDetail = (req, res) => {
  let response = null;
  const id = req.params.id;
  const options = {
    uri: `${omdb_apiHost}/`,
    qs: { apikey: omdb_apiKey, i: id }
  };

  request(options)
    .then((body) => {
      const detail = JSON.parse(body);
      if (detail.imdbRating !== 'N/A') {
        response = detail.imdbRating;
        throw response; // skip the next promise then
      }
      return request.get(`http://www.imdb.com/title/${id}`);
    })
    .then((html) => {
      // if omdb doesn't have imdb rating, get it from imdb.com
      const $ = cheerio.load(html);
      const imdbRating = $('span', '.ratingValue').text(); // -> '7.6/10.0'
      response = imdbRating.substring(0, imdbRating.indexOf('/'));
      res.send(response);
    })
    .catch((err) => {
      // no error, skip the promise chain above
      if (response) {
        return res.send(response);
      }
      console.log(chalk.red('err getting omdb details: ', err));
      res.sendStatus(400);
    });
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