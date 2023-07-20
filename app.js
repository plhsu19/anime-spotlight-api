const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());

if(process.env.NODE_ENV === "development") {
    app.use(morgan('development'));
}

app.use((req, res, next) => {
    console.log(req.body);
    next();
})


module.exports = app;
