const fs = require('fs');
const path = require('path');
const request = require('request-promise');
const config = require('config')['themoviedb'];

const schedule = require('node-schedule');
const recurringRule = new schedule.RecurrenceRule();

const worker = schedule.scheduleJob({ hour: 5, minute: 0 }, () => {
  console.log('worker started...');
  request.get(`${config.hostname}/3/configuration`, { qs: { api_key: config.apiKey } })
    .then(body => {
      let time = (new Date()).toLocaleTimeString();
      let configuration = JSON.parse(body);
      configuration.lastUpdate = time;
      fs.writeFile(path.join(__dirname, 'config.txt'), JSON.stringify(configuration), (err) => {
        if (err) {
          throw err;
        }
        console.log('themoviedb config file has been updated at ', time);
      });
    })
    .catch(err => {
      console.log('error when updating themoviedb config file');
    })
  ;
});