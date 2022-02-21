'use strict';

var express = require('express');
var app = express();

var morgan = require('morgan');
var winston = require('./helper/winstonLogger');
var dotenv = require('dotenv');
var process = require('process');
var cors = require('cors');
var jwt = require('jsonwebtoken');

var bodyParser = require('body-parser');

var userRouters = require('./routes/user-routes');
var groupRoutes = require('./routes/groups-routes');
var userGroup = require('./routes/userGroup-routes');

var db = require('./data-access/index');
var User = db.User;

var _require = require('./helper/winstonLogger'),
    logger = _require.logger;

var _require2 = require('./helper/errors'),
    isOperationalError = _require2.isOperationalError;

var corsOptions = {
    origin: 'http://localhost:' + process.env.PORT,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

dotenv.config();
app.use(cors(corsOptions));
app.use(morgan('combined', { stream: winston.stream }));
app.use(bodyParser.json());
app.use(userRouters);
app.use(groupRoutes);
app.use(userGroup);

app.post('/authenticate', async function (req, res) {
    console.log(req.body);
    var login = req.body.login;

    var user = await User.findAll({
        where: {
            login: login
        }
    });
    if (!user.length) {
        return res.status(401).send({
            success: false,
            message: 'Bad username combination'
        });
    }

    var payload = { sub: user[0].id, name: user[0].login };
    var token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: 120 });

    return res.send(token);
});

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

app.listen(process.env.PORT, function () {
    console.log({ message: 'CORS-enabled web server http://localhost:' + process.env.PORT, level: 'info' });
    console.log({ message: 'Example app listening at http://localhost:' + process.env.PORT, level: 'info' });
});