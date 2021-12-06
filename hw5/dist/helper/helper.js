'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var winston = require('winston');

var makeLogger = function makeLogger() {
  var logger = winston.createLogger({
    transports: [new winston.transports.Console(), new winston.transports.File({ filename: 'combined.log' })]
  });
  return logger;
};

var logger = function logger(req, res, next) {
  console.log("\x1b[32m", 'Method: ' + req.method + '\n');
  console.log("\x1b[32m", 'Params:', req.query);
  console.log("\x1b[32m", 'Status: ' + res.statusCode + '\n');
  next();
};
var handleError = function handleError(err, res) {
  var statusCode = err.statusCode,
      message = err.message;

  res.status(statusCode).json({
    status: "error",
    statusCode: statusCode,
    message: message
  });
};

var ErrorHandler = function (_Error) {
  _inherits(ErrorHandler, _Error);

  function ErrorHandler(statusCode, message) {
    _classCallCheck(this, ErrorHandler);

    var _this = _possibleConstructorReturn(this, (ErrorHandler.__proto__ || Object.getPrototypeOf(ErrorHandler)).call(this));

    _this.statusCode = statusCode;
    _this.message = message;
    return _this;
  }

  return ErrorHandler;
}(Error);

module.exports = {
  ErrorHandler: ErrorHandler,
  handleError: handleError,
  logger: logger,
  makeLogger: makeLogger
};