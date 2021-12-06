'use strict';

var express = require('express');
var app = express();

var morgan = require('morgan');
var process = require('process');

var bodyParser = require('body-parser');

var userRouters = require('./routes/user-routes');
var groupRoutes = require('./routes/groups-routes');
var userGroup = require('./routes/userGroup-routes');

var _require = require('./helper/winstonLogger'),
    logger = _require.logger;

var port = 3000;

app.use(bodyParser.json());
app.use(userRouters);
app.use(groupRoutes);
app.use(userGroup);

// process.on('unhandledRejection', error => {
//     throw error
// })

// process.on('uncaughtException', error => {
//     logError(error)

//     if (!isOperationalError(error)) {
//     process.exit(1)
//     }
// })

app.listen(port, function () {
   logger.log({ message: 'Example app listening at http://localhost:' + port, level: 'info' });
});