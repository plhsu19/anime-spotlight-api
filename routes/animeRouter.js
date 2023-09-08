const express = require('express');
const animeController = require('../controllers/animeController');

const router = express.Router();

// GET /animes/
router.get('/', animeController.getAnimes);

// GET /animes/{animeId}
router.get('/:animeId', animeController.validateId, animeController.getAnime);

// POST /animes
router.post(
  '/',
  animeController.validateRequestBody,
  animeController.createAnime,
);

// PUT /animes
router.put(
  '/:animeId',
  animeController.validateId,
  animeController.validateRequestBody,
  animeController.updateAnime,
);

// DELETE /animes/{animeId}
router.delete('/:animeId', animeController.validateId, animeController.deleteAnime);

// centralized error handler
router.use(animeController.errorHandler);


module.exports = router;
