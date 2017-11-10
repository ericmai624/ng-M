const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');
const app = express();
const port = process.env.PORT || 8080;
require('../worker');

app.use(middleware.bodyParser.json());
app.use(middleware.bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname + '/../dist/')));

app.use('/api/movies', middleware.setHeaders, routes.movies);

app.listen(port, () => console.log(`Ready to accept connections on ${port}`));
