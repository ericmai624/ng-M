const router = require('express').Router();
const { MovieController } = require('../controller');

router.get('/', MovieController.fetchMovies);

router.get('/tmdb/movie/:id', MovieController.fetchMovieById);

router.get('/tmdb/config', MovieController.readTMDBConfigFile);

router.get('/tmdb/search', MovieController.fetchMoviesWithKeyword);

router.get('/douban/:id', MovieController.fetchDoubanRating);

router.get('/omdb/:id', MovieController.fetchOMDBDetail);

module.exports = router;