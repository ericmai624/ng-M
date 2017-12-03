const fs = require('fs');
const path = require('path');
const request = require('request-promise');
const chalk = require('chalk');
const Vibrant = require('node-vibrant');

module.exports.getBackdrop = (req, res) => {
  const { background, poster } = req.query;

  new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname + '/../../worker/config.txt'), 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  })
    .then((data) => {
      const config = JSON.parse(data);
      const posterUrl = config.images.secure_base_url + config.images.poster_sizes[4] + poster;
      const backgroundUrl = config.images.secure_base_url + config.images.backdrop_sizes[2] + background;
      const vibrant = new Vibrant(posterUrl);
      return Promise.all([
        request({ uri: backgroundUrl, resolveWithFullResponse: true, encoding: 'binary'}),
        vibrant.getPalette()
      ]);
    })
    .then(([bgResponse, palette]) => {
      const response = {};
      const prefix = `data:${bgResponse.headers['content-type']};base64,`;
      const base64 = Buffer.from(bgResponse.body, 'binary').toString('base64');

      let maxPopulation = -Infinity;
      let minPopulation = Infinity;
      let maxKey = 'Muted';
      let minKey = 'Vibrant';

      for (let prop in palette) {
        if (!palette[prop]) {
          continue;
        }

        const population = palette[prop].getPopulation();

        if (population > maxPopulation) {
          maxPopulation = population;
          maxKey = prop;
        }
        if (population < minPopulation) {
          minPopulation = population;
          minKey = prop;
        }
      }

      const circle = palette[minKey].getRgb();
      const outter = palette[maxKey].getRgb();      

      response.bg = prefix + base64;
      response.palette = { outter, circle };
      res.send(JSON.stringify(response));
    })
    .catch((err) => {
      console.log(chalk.red(err));
      res.sendStatus(404);
    });
};