const router = require('express').Router();
const { MovieController } = require('../controller');

router.route('/')
  .get(MovieController.fetchMovies)
  .post()
;

router.get('/poster', MovieController.fetchPoster);

router.get('/search', MovieController.fetchMoviesWithKeyword);

module.exports = router;