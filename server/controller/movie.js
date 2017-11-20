const request = require('request-promise');
const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const chalk = require('chalk');

const config = require('config')['themoviedb'];

const readFileAsync = Promise.promisify(fs.readFile);
const apiHost = config.hostname || process.env.TMDB_API_HOST;
const apiKey = config.apiKey || process.env.TMDB_API_KEY;

module.exports.fetchMovies = (req, res) => {
  const options = {
    uri: `${apiHost}/3/discover/movie`,
    qs: {
      api_key: apiKey,
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
    .catch((err) => console.log(chalk.red('error in fetch movies promise chain: ' + err)));
};

module.exports.fetchMovieById = (req, res) => {
  const id = req.params.id;
  const options = {
    uri: `${apiHost}/3/movie/${id}`,
    qs: { api_key: apiKey }
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
    uri: `${apiHost}/3/search/movie`,
    qs: {
      api_key: apiKey,      
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

module.exports.fetchImage = (req, res) => {
  const link = req.query.link;
  const type = req.query.type;

  if (link === 'null') {
    return res.sendStatus(400);
  }

  readFileAsync(path.join(__dirname + '/../../worker/config.txt'))
    .then((file) => {
      let configuration = JSON.parse(file);
      let sizes = configuration.images[`${type}_sizes`];

      let uri = configuration.images.secure_base_url + sizes[3] + link;

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
      console.log(chalk.red('error fetching poster: ' + err));
      res.sendStatus(404);
    });
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
      const rating = responseObj.subjects[0].rating;
      res.send(JSON.stringify(rating));
    })
    .catch((err) => {
      chalk.red('err fetching douban details: ', err);
      res.sendStatus(400);
    });
};