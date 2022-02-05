'use strict';

var _require = require('sequelize'),
    Sequelize = _require.Sequelize;

var process = require('process');
var dotenv = require('dotenv');

dotenv.config();
var sequelize = new Sequelize(process.env.DB_LINK);

sequelize.authenticate();

var User = require('../models/user')(sequelize);
var Groups = require('../models/groups')(sequelize);
var UserGroup = require('../models/user-group')(sequelize);

User.belongsToMany(Groups, { as: "User", through: UserGroup, foreignKey: 'UserId' });
Groups.belongsToMany(User, { as: "Group", through: UserGroup, foreignKey: 'GroupId' });

var user = void 0,
    group = void 0;

sequelize.sync();

module.exports = {
    sequelize: sequelize,
    User: User,
    Groups: Groups,
    UserGroup: UserGroup
};