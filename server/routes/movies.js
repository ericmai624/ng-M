const router = require('express').Router();
const { MovieController } = require('../controller');

router.route('/')
  .get(MovieController.fetchMovies)
  .post()
;

module.exports = router;