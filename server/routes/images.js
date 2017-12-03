const router = require('express').Router();
const { ImageController } = require('../controller');

router.get('/', ImageController.getBackdrop);

module.exports = router;