'use strict';

var db = require('../data-access/index');

// import instance of DB tables
var UserGroup = db.UserGroup;
var User = db.User;
var Group = db.Groups;

var getUserGroups = function getUserGroups() {
    return UserGroup.findAll();
};

var addUsersToGroup = async function addUsersToGroup(groupId, usersId) {
    try {
        await db.sequelize.transaction(async function (t) {
            var user = await User.findOne({ where: { id: usersId } });
            var group = await Group.findOne({ where: { id: groupId } });
            await user.addUser(group);
        });
    } catch (e) {
        console.log(e);
    }
};

var removeAllRelation = function removeAllRelation(userId) {
    return User.destroy({ where: { id: userId }, force: true });
};

module.exports = {
    getUserGroups: getUserGroups,
    addUsersToGroup: addUsersToGroup,
    removeAllRelation: removeAllRelation
};