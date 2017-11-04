const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const app = express();
const port = process.env.PORT || 8080;

app.use(middleware.bodyParser.json());
app.use(middleware.bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname + '/../dist/')));

app.listen(port, () => console.log(`Ready to accept connections on ${port}`));
