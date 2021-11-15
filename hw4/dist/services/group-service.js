'use strict';

var db = require('../data-access/index');
var Group = db.groups;

var getGroups = function getGroups(limit) {
    return Group.findAll({}, limit);
};

var createGroup = function createGroup(body) {
    var id = body.id,
        name = body.name,
        permissions = body.permissions;

    return Group.create({
        id: id,
        name: name,
        permissions: permissions
    });
};

module.exports = {
    getGroups: getGroups,
    createGroup: createGroup
};