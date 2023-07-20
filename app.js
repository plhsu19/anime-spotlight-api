const express = require('express');
const morgan = require('morgan');

const app = express();

// middleware to parse JSON based request payload
app.use(express.json());
// middleware to log the received requests
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  next();
}

app.use((req, res, next) => {
  console.log(req.body);
});

module.exports = app;
