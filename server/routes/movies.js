const router = require('express').Router();
const { MovieController } = require('../controller');

router.get('/', MovieController.fetchMovies);

router.get('/image', MovieController.fetchImage);

router.get('/douban/:id', MovieController.fetchDoubanRating);

router.get('/omdb/:id', MovieController.fetchOMDBDetail);

router.get('/:id', MovieController.fetchMovieById);

router.get('/search', MovieController.fetchMoviesWithKeyword);

module.exports = router;