const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const animeRouter = require('./routes/animeRouter');
const errorController = require('./controllers/errorController');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET'],
}))
// middleware to parse JSON based request payload
app.use(express.json());
// middleware to log the received requests
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Anime routes
app.use('/animes', animeRouter);

// other routes
app.use(errorController.getRouteNotFound);

module.exports = app;
