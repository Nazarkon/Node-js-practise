const express = require('express')
const app = express();

var morgan = require('morgan');
var winston = require('./helper/winstonLogger');
const process = require('process');

const bodyParser = require('body-parser');

const userRouters = require('./routes/user-routes');
const groupRoutes = require('./routes/groups-routes');
const userGroup = require('./routes/userGroup-routes');

const { logger } = require('./helper/winstonLogger');
const { isOperationalError } = require('./helper/errors');
const port = 3000;

app.use(morgan('combined', { stream: winston.stream }));
app.use(bodyParser.json());
app.use(userRouters);
app.use(groupRoutes);
app.use(userGroup);


process.on('unhandledRejection', error => {
    console.log("HTTP 500 Internal Server Error!")
    throw error
})

process.on('uncaughtException', error => {
    console.log("HTTP 500 Internal Server Error!")
   
    if (!isOperationalError(error)) {
    process.exit(1)
    }
})

app.listen(port, () => {
    console.log({ message: `Example app listening at http://localhost:${port}`, level: 'info'});
});
