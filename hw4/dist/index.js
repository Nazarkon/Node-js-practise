'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var userRouters = require('./routes/user-routes');
var groupRoutes = require('./routes/groups-routes');
var port = 3000;

app.use(bodyParser.json());
app.use(userRouters);
app.use(groupRoutes);

app.listen(port, function () {
    console.log('Example app listening at http://localhost:' + port);
});