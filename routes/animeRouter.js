const express = require('express');
const animeController = require('../controllers/animeController');


const router = express.Router();

// GET /animes/
router.get('/', animeController.getAnimes);

// GET /animes/{animeId}
router.get('/:animeId', animeController.validateId, animeController.getAnime);

module.exports = router;
