const Anime = require('../models/anime');
const Joi = require('joi');
const NotFoundError = require('../errors/notFoundError');

const INVALID_ID_FORMAT_ERROR_MESSAGE = 'Id must be a number larger than 0';
const INVALID_REQUEST_BODY_ERROR_MESSAGE =
  'Invalid request body format or value, please check the body fields again';
const INTERNAL_SYSTEM_FAILURE_ERROR_MESSAGE =
  'Something went wrong, please try again later or contact support.';
const ALLOWED_SUBTYPE_VALUES = ['ONA', 'OVA', 'TV', 'movie'];
const ALLOWED_STATUS_VALUES = ['current', 'finished'];

module.exports.getAnimes = (req, res, next) => {
  try {
    const animes = Anime.findAll();
    return res.status(200).json({
      success: true,
      results: animes.length,
      data: {
        animes: animes,
      },
    });
  } catch (e) {
    // Improvement: move the 500 error to the centralized error handler
    console.error(`get animes failed with error: ${e}`);
    return res.status(500).json({
      success: false,
      message: INTERNAL_SYSTEM_FAILURE_ERROR_MESSAGE,
    });
  }
};

module.exports.validateId = (req, res, next) => {
  const id = parseInt(req.params.animeId);

  try {
    // check if the anime id is a number > 0
    const schema = Joi.object({
      animeId: Joi.string().pattern(/^[0-9]+$/),
      id: Joi.number().min(1),
    });
    const validateResult = schema.validate({
      animeId: req.params.animeId,
      id: id,
    });
    if (!!validateResult.error) {
      return res.status(400).json({
        success: false,
        message: INVALID_ID_FORMAT_ERROR_MESSAGE,
      });
    }
  } catch (e) {
    console.error(`validate id ${req.params.animeId} failed with error: ${e}`);
    // Improvement: move the 500 error to the centralized error handler
    console.error(e);
    return res.status(500).json({
      success: false,
      message: INTERNAL_SYSTEM_FAILURE_ERROR_MESSAGE,
    });
  }

  // pass the parsed number id to the next controller
  req.id = id;
  next();
};

module.exports.validateRequestBody = (req, res, next) => {
  try {
    // check the request body for create and update anime endpoints
    const schema = Joi.object({
      title: Joi.string().max(256).required(),
      enTitle: Joi.string().max(256),
      description: Joi.string().max(2000).required(),
      rating: Joi.number().min(0).max(100).required(),
      startDate: Joi.date().iso().min('1-1-1900').max('now').required(),
      endDate: Joi.date().iso().min('1-1-1900'),
      subtype: Joi.string().required(),
      status: Joi.string().required(),
      posterImage: Joi.string().uri().required(),
      coverImage: Joi.string().uri(),
      episodeCount: Joi.number().min(0).required(),
      categories: Joi.array().unique().items(Joi.string()),
    });

    const validateResult = schema.validate(req.body);

    if (!!validateResult.error) {
      return res.status(400).json({
        success: false,
        message:
          validateResult.error.details[0]?.message ??
          INVALID_REQUEST_BODY_ERROR_MESSAGE,
      });
    }
    // check the enum for subtype and status
    if (
      !ALLOWED_SUBTYPE_VALUES.includes(req.body.subtype) ||
      !ALLOWED_STATUS_VALUES.includes(req.body.status)
    ) {
      return res.status(400).json({
        success: false,
        message: `subtype must be one of ${ALLOWED_SUBTYPE_VALUES}; status must be one of ${ALLOWED_STATUS_VALUES}`,
      });
    }
  } catch (e) {
    console.error(`validate request body ${req.body} failed with error: ${e}`);
    // TODO: move the error handling to the centralized error handler
    return res.status(500).json({
      success: false,
      message: INTERNAL_SYSTEM_FAILURE_ERROR_MESSAGE,
    });
  }
  next();
};

module.exports.getAnime = (req, res, next) => {
  try {
    // find the anime with id
    const anime = Anime.findById(req.id);

    if (anime === null) {
      throw new NotFoundError(req.id);
    }

    return res.status(200).json({
      success: true,
      data: {
        anime: anime,
      },
    });
  } catch (e) {
    console.error(`get anime with id ${req.id} failed with error: ${e}`);
    if (e instanceof NotFoundError) {
      return res.status(404).json({
        success: false,
        message: e.message,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: INTERNAL_SYSTEM_FAILURE_ERROR_MESSAGE,
      });
    }
  }
};

module.exports.createAnime = (req, res, next) => {
  try {
    const createdAnime = new Anime(req.body);
    return res.status(201).json({
      success: true,
      data: {
        anime: createdAnime.save(),
      },
    });
  } catch (e) {
    console.error(`create anime failed with error: ${e}`);
    // TODO: move to centralized error handler
    return res.status(500).json({
      success: false,
      message: INTERNAL_SYSTEM_FAILURE_ERROR_MESSAGE,
    });
  }
};

module.exports.updateAnime = (req, res, next) => {
  try {
    const updateAnime = new Anime({ id: req.id, ...req.body });
    return res.status(201).json({
      success: true,
      data: {
        anime: updateAnime.save(),
      },
    });
  } catch (e) {
    console.error(`update anime with id ${req.id} failed with error: ${e}`);
    // TODO: move to centralized error handler
    if (e instanceof NotFoundError) {
      return res.status(404).json({
        success: false,
        message: e.message,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: INTERNAL_SYSTEM_FAILURE_ERROR_MESSAGE,
      });
    }
  }
};
