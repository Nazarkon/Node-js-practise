'use strict';

var logger = require('./logger');
var BaseError = require('./BaseError');

function logError(err) {
  logger.error(err);
}

function logErrorMiddleware(err, req, res, next) {
  logError(err);
  next(err);
}

function returnError(err, req, res, next) {
  res.status(err.statusCode || 500).send(err.message);
}

function isOperationalError(error) {
  if (error instanceof BaseError) {
    return error.isOperational;
  }
  return false;
}

module.exports = {
  logError: logError,
  logErrorMiddleware: logErrorMiddleware,
  returnError: returnError,
  isOperationalError: isOperationalError
};