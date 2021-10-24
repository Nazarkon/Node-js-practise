'use strict';

var db = require('../db/index');
var User = db.user;

var getUsers = function getUsers(req, res) {
    var _req$query = req.query,
        _req$query$loginSubst = _req$query.loginSubstring,
        loginSubstring = _req$query$loginSubst === undefined ? '' : _req$query$loginSubst,
        _req$query$limit = _req$query.limit,
        limit = _req$query$limit === undefined ? 10 : _req$query$limit;

    User.findAll({ where: {
            login: loginSubstring
        },
        limit: limit }).then(function (result) {
        res.send(result).sendStatus(201);
    }).catch(function (error) {
        res.sendStatus(404).send(error);
    });
};

var getUserById = function getUserById(req, res) {
    var userId = +req.params.id;
    User.findAll({
        where: {
            id: userId
        }
    }).then(function (result) {
        res.send(result).sendStatus(201);
    }).catch(function (error) {
        res.sendStatus(404).send(error);
    });
};

var createUser = function createUser(req, res) {
    if (Object.entries(req.body).length !== 0) {
        console.log(req.body, 'body');
        var _req$body = req.body,
            id = _req$body.id,
            login = _req$body.login,
            password = _req$body.password,
            age = _req$body.age,
            isDeleted = _req$body.isDeleted;

        User.create({
            id: id,
            login: login,
            password: password,
            age: age,
            isDeleted: isDeleted
        }).then(function (result) {
            console.log(result);
            res.sendStatus(201);
        }).catch(function (error) {
            console.log(error);
            res.end('error');
        });
    } else {
        res.sendStatus(403);
    }
};

var updateUserById = function updateUserById(req, res) {
    if (Object.values(req.body).length) {
        var userId = +req.params.id;
        var _req$body2 = req.body,
            login = _req$body2.login,
            password = _req$body2.password,
            age = _req$body2.age,
            isDeleted = _req$body2.isDeleted;

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

        User.update(updateObject, {
            where: {
                id: userId
            }
        }).then(function (result) {
            res.sendStatus(201).send(result);
        }).catch(function (error) {
            res.sendStatus(500).send(error);
        });
    } else {
        res.sendStatus(403).send('No data provided');
    }
};

var deleteUserById = function deleteUserById(req, res) {
    var userId = +req.params.id;
    User.destroy({
        where: {
            id: userId
        }
    }).then(function () {
        res.sendStatus(201).send('User is Deleted');
    }).catch(function () {
        res.sendStatus(404).send("Can't find user with such id");
    });
};

module.exports = {
    getUsers: getUsers,
    getUserById: getUserById,
    updateUserById: updateUserById,
    deleteUserById: deleteUserById,
    createUser: createUser
};