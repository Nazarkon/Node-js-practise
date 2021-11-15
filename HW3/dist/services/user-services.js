'use strict';

var db = require('../data-access/index');
var User = db.user;

var getUsers = function getUsers(loginSubstring, limit) {
    return User.findAll({ where: {
            login: loginSubstring
        },
        limit: limit });
};

var getUserById = function getUserById(id) {
    var userId = +id;
    return User.findAll({
        where: {
            id: userId
        }
    });
};

var createUser = function createUser(body) {
    var id = body.id,
        login = body.login,
        password = body.password,
        age = body.age,
        isDeleted = body.isDeleted;

    return User.create({
        id: id,
        login: login,
        password: password,
        age: age,
        isDeleted: isDeleted
    });
};

var updateUserById = function updateUserById(userId, body) {
    var login = body.login,
        password = body.password,
        age = body.age,
        isDeleted = body.isDeleted;

    var updateObject = {};
    if (login) {
        updateObject.login = login;
    }
    if (password) {
        updateObject.password = password;
    }
    if (age) {
        updateObject.age = age;
    }
    if (isDeleted) {
        updateObject.isDeleted = isDeleted;
    }

    return User.update(updateObject, {
        where: {
            id: userId
        }
    });
};

var deleteUserById = function deleteUserById(id) {
    var userId = +id;
    return User.destroy({
        where: {
            id: userId
        }
    });
};

module.exports = {
    getUsers: getUsers,
    getUserById: getUserById,
    updateUserById: updateUserById,
    deleteUserById: deleteUserById,
    createUser: createUser
};