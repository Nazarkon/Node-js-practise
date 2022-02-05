const express = require('express')
const app = express();

var morgan = require('morgan');
var winston = require('../hw6/src/helper/winstonLogger');
const dotenv = require('dotenv');
const process = require('process');
const cors = require('cors')
const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');

const userRouters = require('../hw7/src/routes/user-routes');
const groupRoutes = require('../hw7/src/routes/groups-routes');
const userGroup = require('../hw7/src/routes/userGroup-routes');

const db = require('../hw6/src/data-access/index');
const User = db.User;


const { logger } = require('../hw7/src/helper/winstonLogger');
const { isOperationalError } = require('../hw7/src/helper/errors');

const corsOptions = {
    origin: `http://localhost:${process.env.PORT}`,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

dotenv.config();
app.use(cors(corsOptions))
app.use(morgan('combined', { stream: winston.stream }));
app.use(bodyParser.json());
app.use(userRouters);
app.use(groupRoutes);
app.use(userGroup);

app.post('/authenticate', async function (req, res) {
    console.log(req.body)
    const { login } = req.body;
    const user = await User.findAll({
        where: {
            login: login
        }
    })
    if(!user.length) {
        return res.status(401).send({
            success: false,
            message: 'Bad username combination'
        })
    }

    const payload = { sub: user[0].id, name: user[0].login};
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: 120 });

    return res.send(token);
})


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

app.listen(process.env.PORT, () => {
    console.log({ message: `CORS-enabled web server http://localhost:${process.env.PORT}`, level: 'info'})
    console.log({ message: `Example app listening at http://localhost:${process.env.PORT}`, level: 'info'});
});

module.exports = app
