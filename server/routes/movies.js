const router = require('express').Router();
const { MovieController } = require('../controller');

router.get('/', MovieController.fetchMovies);

router.get('/image', MovieController.fetchImage);

router.get('/:id', MovieController.fetchMovieById);

router.get('/search', MovieController.fetchMoviesWithKeyword);

module.exports = router;