const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');
const app = express();
const port = process.env.PORT || 8080;
const dist = path.join(__dirname + '/../dist/');
require('../worker');

app.use(middleware.bodyParser.json());
app.use(middleware.bodyParser.urlencoded({ extended: true }));

app.engine('html', require('ejs').renderFile); // use ejs renderFile to compile html
app.use(express.static(dist));

// Pages endpoints
app.use('/movie', (req, res) => res.render(dist + 'index.html'));

// Data endpoints
app.use('/api/movies', middleware.setHeaders, routes.movies);

app.listen(port, () => console.log(`Ready to accept connections on ${port}`));
