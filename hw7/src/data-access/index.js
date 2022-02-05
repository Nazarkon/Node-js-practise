const { Sequelize } = require('sequelize');
const process = require('process');
const dotenv = require('dotenv');

dotenv.config();
const sequelize = new Sequelize(process.env.DB_LINK);

sequelize.authenticate()

const User = require('../models/user')(sequelize);
const Groups = require('../models/groups')(sequelize);
const UserGroup = require('../models/user-group')(sequelize);

User.belongsToMany(Groups, { as: "User", through: UserGroup, foreignKey: 'UserId' });
Groups.belongsToMany(User, { as: "Group", through: UserGroup, foreignKey: 'GroupId'});


let user , group;

sequelize.sync()

module.exports = {
    sequelize,
    User,
    Groups,
    UserGroup
};
