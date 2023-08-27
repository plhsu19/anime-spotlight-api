const express = require('express');

const getRouteNotFound = (req, res) => {
  return res.status(404).json({
    message: `Endpoint with method ${req.method} and path ${req.path} is not found.`,
  });
};

module.exports.getRouteNotFound = getRouteNotFound;
