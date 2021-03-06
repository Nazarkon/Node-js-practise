'use strict';

var morgan = require('morgan');
var json = require('morgan-json');
var format = json({
  method: ':method',
  url: ':url',
  status: ':status',
  contentLength: ':res[content-length]',
  responseTime: ':response-time'
});

var logger = require('./logger');
var httpLogger = morgan(format, {
  stream: {
    write: function write(message) {
      var _JSON$parse = JSON.parse(message),
          method = _JSON$parse.method,
          url = _JSON$parse.url,
          status = _JSON$parse.status,
          contentLength = _JSON$parse.contentLength,
          responseTime = _JSON$parse.responseTime;

      logger.info('HTTP Access Log', {
        timestamp: new Date().toString(),
        method: method,
        url: url,
        status: Number(status),
        contentLength: contentLength,
        responseTime: Number(responseTime)
      });
    }
  }
});

module.exports = httpLogger;