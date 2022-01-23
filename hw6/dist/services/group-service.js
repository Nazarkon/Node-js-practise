'use strict';

var db = require('../data-access/index');

// import instance of DB table
var Group = db.Groups;

var getGroups = function getGroups(limit) {
    return Group.findAll({}, limit);
};

var createGroup = function createGroup(body) {
    var name = body.name,
        permissions = body.permissions;

    return Group.create({
        name: name,
        permissions: permissions
    });
};

var updateGroupById = function updateGroupById(groupId, body) {
    var name = body.name,
        permissions = body.permissions;

    var updatedObject = {};
    if (name) {
        updatedObject.name = name;
    }

    if (permissions) {
        updatedObject.permissions = permissions;
    }

    return Group.update(updatedObject, {
        where: {
            id: groupId
        }
    });
};

var getGroupById = function getGroupById(id) {
    var groupId = id;
    console.log(groupId, 'groupId');
    return Group.findAll({
        where: {
            id: groupId
        }
    });
};

var deleteGroupById = function deleteGroupById(id) {
    var groupId = id;
    console.log(groupId, 'groupId');
    return Group.destroy({
        where: {
            id: groupId
        }
    });
};

module.exports = {
    getGroups: getGroups,
    createGroup: createGroup,
    updateGroupById: updateGroupById,
    getGroupById: getGroupById,
    deleteGroupById: deleteGroupById

};