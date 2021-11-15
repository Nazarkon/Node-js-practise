const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://mfoyljio:q4s21Kukr0nnzBUjs2OWSbRUNlTW_JwJ@hattie.db.elephantsql.com/mfoyljio');
sequelize.authenticate();

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const user = require('../models/user')(sequelize);
const groups = require('../models/groups')(sequelize);

module.exports = {
    sequelize,
    user,
    groups
};
