'use strict';

var express = require('express');
var app = express();

var morgan = require('morgan');
var winston = require('./helper/winstonLogger');
var process = require('process');

var bodyParser = require('body-parser');

var userRouters = require('./routes/user-routes');
var groupRoutes = require('./routes/groups-routes');
var userGroup = require('./routes/userGroup-routes');

var _require = require('./helper/winstonLogger'),
    logger = _require.logger;

var _require2 = require('./helper/errors'),
    isOperationalError = _require2.isOperationalError;

var port = 3000;

app.use(morgan('combined', { stream: winston.stream }));
app.use(bodyParser.json());
app.use(userRouters);
app.use(groupRoutes);
app.use(userGroup);

process.on('unhandledRejection', function (error) {
    console.log("HTTP 500 Internal Server Error!");
    throw error;
});

process.on('uncaughtException', function (error) {
    console.log("HTTP 500 Internal Server Error!");

    if (!isOperationalError(error)) {
        process.exit(1);
    }
});

app.listen(port, function () {
    console.log({ message: 'Example app listening at http://localhost:' + port, level: 'info' });
});