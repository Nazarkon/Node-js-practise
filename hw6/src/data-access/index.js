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

const User = require('../models/user')(sequelize);
const Groups = require('../models/groups')(sequelize);
const UserGroup = require('../models/user-group')(sequelize);

User.belongsToMany(Groups, { as: "User", through: UserGroup, foreignKey: 'UserId' });
Groups.belongsToMany(User, { as: "Group", through: UserGroup, foreignKey: 'GroupId'});


let user , group;

sequelize.sync().then((res) => {
    console.log("sync")
}).catch(err => {
    console.log(err)
})

module.exports = {
    sequelize,
    User,
    Groups,
    UserGroup
};
