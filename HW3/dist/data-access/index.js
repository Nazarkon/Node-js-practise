'use strict';

var _require = require('sequelize'),
    Sequelize = _require.Sequelize;

var sequelize = new Sequelize('postgres://mfoyljio:q4s21Kukr0nnzBUjs2OWSbRUNlTW_JwJ@hattie.db.elephantsql.com/mfoyljio');
sequelize.authenticate();

sequelize.authenticate().then(function () {
    console.log('Connection has been established successfully.');
}).catch(function (err) {
    console.error('Unable to connect to the database:', err);
});

var user = require('../models/user')(sequelize);

module.exports = {
    sequelize: sequelize,
    user: user
};