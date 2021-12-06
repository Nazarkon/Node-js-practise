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

var User = require('../models/user')(sequelize);
var Groups = require('../models/groups')(sequelize);
var UserGroup = require('../models/user-group')(sequelize);

User.belongsToMany(Groups, { as: "User", through: UserGroup, foreignKey: 'UserId' });
Groups.belongsToMany(User, { as: "Group", through: UserGroup, foreignKey: 'GroupId' });

var user = void 0,
    group = void 0;

sequelize.sync().then(function (res) {
    console.log("sync");
}).catch(function (err) {
    console.log(err);
});

module.exports = {
    sequelize: sequelize,
    User: User,
    Groups: Groups,
    UserGroup: UserGroup
};