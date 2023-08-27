const Anime = require('../models/anime');
const Joi = require('joi');

const INVALID_ID_FORMAT_ERROR_MESSAGE = 'Id must be a number larger than 0';
const INTERNAL_SYSTEM_FAILURE_ERROR_MESSAGE =
  'Something went wrong, please try again later or contact support.';

module.exports.getAnimes = (req, res, next) => {
  const animes = Anime.findAll();

  return res.status(200).json({
    success: true,
    results: animes.length,
    data: {
      animes: animes,
    },
  });
};

module.exports.validateId = (req, res, next) => {
  const id = parseInt(req.params.animeId);
  console.log(req.params.animeId)
  console.log(id)

  // check if the anime id is a number > 0
  const schema = Joi.object({
    animeId: Joi.string().pattern(/^[0-9]+$/),
    id: Joi.number().min(1),
  })

  try {
    const validateResult = schema.validate({
      animeId: req.params.animeId,
      id: id,
    });
    if (!!validateResult.error) {
      console.log(validateResult.error);
      return res.status(400).json({
        success: false,
        message: INVALID_ID_FORMAT_ERROR_MESSAGE,
      });
    }
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: INTERNAL_SYSTEM_FAILURE_ERROR_MESSAGE,
    });
  }

  // check if anime with id exists in the animes array
  const animes = Anime.findAll();
  const index =
    animes.length === 0 || id > animes[-1]?.id
      ? -1
      : animes.findIndex((anime) => anime.id === id);
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Anime with Id ${id} is not found`,
    });
  }

  // pass the animes, id, and founded index in the req to the next controller
  req.id = id;
  req.animes = animes;
  req.index = index;
  next();
};

module.exports.getAnime = (req, res, next) => {
  return res.status(200).json({
    success: true,
    data: {
      anime: req.animes[req.index],
    },
  });
};
