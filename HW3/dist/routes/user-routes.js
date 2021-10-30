'use strict';

var express = require('express');
var Joi = require('joi');
var router = express.Router();

var _require = require('../services/user-services'),
    getUsers = _require.getUsers,
    createUser = _require.createUser,
    getUserById = _require.getUserById,
    updateUserById = _require.updateUserById,
    deleteUserById = _require.deleteUserById;

var schema = Joi.object({
    id: Joi.number().required(),
    login: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(8).max(20).required(),
    age: Joi.number().min(4).max(130).required(),
    isDeleted: Joi.boolean().required()

});

var validation = function validation(userSchema) {
    return function (req, res, next) {
        var _userSchema$validate = userSchema.validate(req.body),
            error = _userSchema$validate.error;

        if (error) {
            res.status(400).json(error.message);
        }
        next();
    };
};

router.get('/users', async function (req, res) {
    var _req$query = req.query,
        _req$query$loginSubst = _req$query.loginSubstring,
        loginSubstring = _req$query$loginSubst === undefined ? '' : _req$query$loginSubst,
        _req$query$limit = _req$query.limit,
        limit = _req$query$limit === undefined ? 10 : _req$query$limit;

    try {
        var data = await getUsers(loginSubstring, limit);
        res.send(data).status(200).end();
    } catch (e) {
        res.send(e).sendStatus(400).end();
    }
});
router.post('/user', validation(schema), async function (req, res) {
    try {
        if (Object.entries(req.body).length !== 0) {
            var data = await createUser(req.body);
            res.send("Created").status(201).end();
        } else {
            res.status(400).end();
        }
    } catch (e) {
        res.send(e).status(400).end();
    }
});
router.get('/user/:id', async function (req, res) {
    try {
        var data = await getUserById(req.params.id);
        res.send(data).status(200);
    } catch (e) {
        res.send(e).status(400).end();
    }
});
router.put('/user/:id', validation(schema), async function (req, res) {
    try {
        if (Object.values(req.body).length) {
            var data = await updateUserById(+req.params.id, req.body);
            res.send(data).status(201).end();
        } else {
            res.status(400).end();
        }
    } catch (e) {
        res.send(e).status(400).end();
    }
});
router.delete('/user/:id', async function (req, res) {
    try {
        var data = deleteUserById(userId);
        res.send("Deleted").status(200).end();
    } catch (e) {
        res.send(e).status(400).end();
    }
});

module.exports = router;