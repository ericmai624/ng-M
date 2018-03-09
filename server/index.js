const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');
const app = express();
const port = process.env.PORT || 8080;
const dist = path.join(__dirname, '..', 'dist');
const { each } = require('lodash');
require('../worker');

app.use(middleware.bodyParser.json());
app.use(middleware.bodyParser.urlencoded({ extended: true }));
app.use(middleware.morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev'));

app.engine('html', require('pug').renderFile); // use pug renderFile to render html
app.use(express.static(dist));

// Data endpoints
each(routes, (cb, endpoint) => app.use(`/api/${endpoint}`, middleware.setHeaders, cb));

// Pages endpoints(Frontend handled routing)
app.get('*', (req, res) => res.render(dist + 'index.html'));

app.listen(port, console.log.bind(console, `Ready to accept connections on ${port}`));
