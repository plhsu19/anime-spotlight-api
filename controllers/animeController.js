const Anime = require('../models/Anime');
const Joi = require('joi');
const NotFoundError = require('../errors/notFoundError');
const InvalidRequestError = require('../errors/invalidRequestError');
const animeHelper = require('../helpers/animeHelper');

const INVALID_ID_FORMAT_ERROR_MESSAGE = 'Id must be a number larger than 0';
const INVALID_REQUEST_BODY_ERROR_MESSAGE =
  'Invalid request body format or value, please check the body fields again';
const INTERNAL_SYSTEM_FAILURE_ERROR_MESSAGE =
  'Something went wrong, please try again later or contact support.';
const ALLOWED_SUBTYPE_VALUES = ['ONA', 'OVA', 'TV', 'movie'];
const ALLOWED_STATUS_VALUES = ['current', 'finished', 'upcoming'];

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
    console.error(`get animes failed with error: ${e}`);
    return next(e);
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
      throw new InvalidRequestError(INVALID_ID_FORMAT_ERROR_MESSAGE);
    }
  } catch (e) {
    console.error(`validate id ${req.params.animeId} failed with error: ${e}`);
    return next(e);
  }

  // pass the parsed number id to the next controller
  req.id = id;
  next();
};

module.exports.validateRequestBody = (req, res, next) => {
  try {
    // check the request body for create and update anime endpoints
    const schema = Joi.object({
      title: Joi.string().trim().max(256).required(),
      enTitle: Joi.string().trim().allow(null).allow('').max(256),
      description: Joi.string().trim().max(2000).required(),
      rating: Joi.number()
        .min(0)
        .max(10)
        .allow(null)
        .required()
        .prefs({ convert: false }),
      startDate: Joi.date().iso().min('1-1-1900').required(),
      endDate: Joi.date().iso().allow(null).min(Joi.ref('startDate')),
      subtype: Joi.string()
        .valid(...ALLOWED_SUBTYPE_VALUES)
        .required(),
      status: Joi.string()
        .valid(...ALLOWED_STATUS_VALUES)
        .required(),
      posterImage: Joi.string().trim().uri().required(),
      coverImage: Joi.string().trim().allow(null).allow('').uri(),
      episodeCount: Joi.number()
        .integer()
        .min(1)
        .allow(null)
        .prefs({ convert: false }),
      categories: Joi.array()
        .unique()
        .min(1)
        .items(Joi.string().trim().min(1).max(256))
        .required(),
    });

    const { value, error } = schema.validate(req.body, { abortEarly: false });

    if (!!error) {
      const errorMessages = [];
      error.details.forEach((detail) => {
        errorMessages.push(detail.message);
      });

      throw new InvalidRequestError(
        !errorMessages.join(', ')
          ? INVALID_REQUEST_BODY_ERROR_MESSAGE
          : errorMessages.join(', '),
      );
    }
    req.validatedBody = {
      ...value,
      enTitle: animeHelper.nonEmptyString(value.enTitle),
      coverImage: animeHelper.nonEmptyString(value.coverImage),
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    };
  } catch (e) {
    console.error(`validate request body failed with error: ${e}`);
    return next(e);
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
    return next(e);
  }
};

module.exports.createAnime = (req, res, next) => {
  try {
    const createdAnime = new Anime(req.validatedBody);
    return res.status(201).json({
      success: true,
      data: {
        anime: createdAnime.save(),
      },
    });
  } catch (e) {
    console.error(`create anime failed with error: ${e}`);
    return next(e);
  }
};

module.exports.updateAnime = (req, res, next) => {
  try {
    const updateAnime = new Anime({ id: req.id, ...req.validatedBody });
    return res.status(201).json({
      success: true,
      data: {
        anime: updateAnime.save(),
      },
    });
  } catch (e) {
    console.error(`update anime with id ${req.id} failed with error: ${e}`);
    return next(e);
  }
};
module.exports.deleteAnime = (req, res, next) => {
  try {
    Anime.deleteById(req.id);
    return res.status(200).json({
      success: true,
    });
  } catch (e) {
    console.error(`delete anime with id ${req.id} failed with error: ${e}`);
    return next(e);
  }
};

module.exports.errorHandler = (err, req, res, next) => {
  if (err instanceof NotFoundError) {
    return res.status(404).json({
      success: false,
      message: err.message,
    });
  } else if (err instanceof InvalidRequestError) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  } else {
    return res.status(500).json({
      success: false,
      message: INTERNAL_SYSTEM_FAILURE_ERROR_MESSAGE,
    });
  }
};
