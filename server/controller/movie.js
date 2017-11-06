const request = require('request-promise');
const Promise = require('bluebird');

module.exports.fetchMovies = (req, res) => {
  let data = null;
  let start = Date.now();
  res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
  request.get('https://api.douban.com/v2/movie/coming_soon?count=100')
    .then(body => {
      console.log('first response: ', Date.now() - start);
      data = JSON.parse(body).subjects;
      let tasks = [];

      for (let i = 0; i < data.length; i++) {
        tasks.push(request({ uri: data[i].images.large, resolveWithFullResponse: true, encoding: 'binary' })
          .then(response => {
            let prefix = `data:${response.headers['content-type']};base64,`;
            let base64 = Buffer.from(response.body, 'binary').toString('base64');
            data[i].imageURL = prefix + base64;
          }));
      }

      return Promise.all(tasks);
    })
    .then(() => {
      console.log('process took ', Date.now() - start, 'ms');
      res.send(data);
    })
    .catch(err => {
      console.log('error in fetchMovies promise chain: ', err);
      res.sendStatus(500);
    });
};