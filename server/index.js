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
app.use(middleware.morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev'));

app.engine('html', require('ejs').renderFile); // use ejs renderFile to compile html
app.use(express.static(dist));

// Data endpoints
app.use('/api/movies', middleware.setHeaders, routes.movies);
app.use('/api/images', middleware.setHeaders, routes.images);

// Pages endpoints(Frontend handled routing)
app.get('*', (req, res) => res.render(dist + 'index.html'));

app.listen(port, () => console.log(`Ready to accept connections on ${port}`));
