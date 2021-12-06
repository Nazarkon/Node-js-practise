'use strict';

var debug = require('debug')('express'),
    express = require('express');
var Joi = require('joi');
var router = express.Router();

var _require = require('../helper/winstonLogger'),
    logger = _require.logger;

var _require2 = require('../services/user-services'),
    getUsers = _require2.getUsers,
    createUser = _require2.createUser,
    getUserById = _require2.getUserById,
    updateUserById = _require2.updateUserById,
    deleteUserById = _require2.deleteUserById;

var schema = Joi.object({
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
            res.status(400).json(error.message).end();
        }
        next();
    };
};

router.get('/users', async function (req, res, next) {
    debug(req.method + ' ' + req.url);
    var _req$query = req.query,
        _req$query$loginSubst = _req$query.loginSubstring,
        loginSubstring = _req$query$loginSubst === undefined ? '' : _req$query$loginSubst,
        _req$query$limit = _req$query.limit,
        limit = _req$query$limit === undefined ? 10 : _req$query$limit;

    try {
        var data = await getUsers(loginSubstring, limit);
        res.send(data).status(200).end();
        logger.info('StatusCode: 200 \n\n                      loginSubstring: ' + loginSubstring + ' \n\n                      limit: ' + limit + ' \n\n                      method: ' + req.method + ' \n');
    } catch (e) {
        next(e);
    }
});
router.post('/user', validation(schema), async function (req, res, next) {
    try {
        if (Object.entries(req.body).length !== 0) {
            var data = await createUser(req.body);
            res.send("Created").status(201).end();
            logger.info('StatusCode: 201 \n\n                         method: ' + req.method + ' \n');
        } else {
            res.status(400).end();
            logger.info('StatusCode: 400 \n\n                        method: ' + req.method + ' \n');
        }
    } catch (e) {
        next(e);
    }
});
router.get('/user/:id', async function (req, res, next) {
    try {
        var data = await getUserById(req.params.id);
        res.send(data).status(200).end();
        logger.info('StatusCode: 200 \n\n                     userId: ' + req.params.id + ' \n\n                     method: ' + req.method + ' \n');
    } catch (e) {
        next(e);
    }
});
router.put('/user/:id', validation(schema), async function (req, res) {
    try {
        if (Object.values(req.body).length) {
            var data = await updateUserById(+req.params.id, req.body);
            res.send(data).status(201).end();
            logger.info('StatusCode: 201 \n\n                     userId: ' + req.params.id + ' \n\n                     method: ' + req.method + ' \n');
        } else {
            res.status(400).end();
        }
    } catch (e) {
        next(e);
    }
});
router.delete('/user/:id', async function (req, res, next) {
    try {
        var data = await deleteUserById(+req.params.id);
        res.send("Deleted").status(200).end();
        logger.info('StatusCode: 200 \n\n                     userId: ' + req.params.id + ' \n\n                     method: ' + req.method + ' \n');
    } catch (e) {
        next(e);
    }
});

module.exports = router;