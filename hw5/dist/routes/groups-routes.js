'use strict';

var express = require('express');
var Joi = require('joi');

var _require = require('../services/group-service'),
    getGroups = _require.getGroups,
    createGroup = _require.createGroup,
    getGroupById = _require.getGroupById,
    deleteGroupById = _require.deleteGroupById,
    updateGroupById = _require.updateGroupById;

var router = express.Router();

var _require2 = require('../helper/winstonLogger'),
    logger = _require2.logger;

var shema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    permissions: Joi.array()
});

var validation = function validation(groupSchema) {
    return function (req, res, next) {
        console.log(req.body, 'body');

        var _groupSchema$validate = groupSchema.validate(req.body),
            error = _groupSchema$validate.error;

        if (error) {
            res.status(400).json(error.message).end();
        }
        next();
    };
};

router.get('/group', async function (req, res) {
    var _req$query$limit = req.query.limit,
        limit = _req$query$limit === undefined ? 10 : _req$query$limit;

    try {
        var data = await getGroups(limit);
        res.send(data).status(200).end();
        logger.info('StatusCode: 200 \n\n                      limit: ' + limit + ' \n\n                      method: ' + req.method + ' \n');
    } catch (e) {
        next(e);
    }
});

router.post('/group', validation(shema), async function (req, res, next) {
    try {
        if (Object.entries(req.body).length !== 0) {
            var data = await createGroup(req.body);
            res.send("Created").status(201).end();
            logger.info('StatusCode: 201 \n\n            method: ' + req.method + ' \n');
        } else {
            res.status(400).end();
            logger.info('StatusCode: 400 \n\n            method: ' + req.method + ' \n');
        }
    } catch (e) {
        next(e);
    }
});

router.get('/group/:id', async function (req, res, next) {
    try {
        var data = await getGroupById(req.params.id);
        res.send(data).status(200).end();
        logger.info('StatusCode: 200 \n\n            groupId: ' + req.params.id + ' \n\n            method: ' + req.method + ' \n');
    } catch (e) {
        next(e);
    }
});

router.put('/group/:id', async function (req, res, next) {
    try {
        if (Object.values(req.body).length) {
            var data = await updateGroupById(req.params.id, req.body);
            res.send(data).status(201).end();
            logger.info('StatusCode: 201 \n\n            groupId: ' + req.params.id + ' \n\n            method: ' + req.method + ' \n');
        } else {
            res.status(400).end();
            logger.info('StatusCode: 201 \n\n            groupId: ' + req.params.id + ' \n\n            method: ' + req.method + ' \n');
        }
    } catch (e) {
        next(e);
    }
});

router.delete('/group/:id', async function (req, res, next) {
    try {
        var data = await deleteGroupById(req.params.id);
        res.send("Deleted").status(200).end();
        logger.info('StatusCode: 200 \n\n        groupId: ' + req.params.id + ' \n\n        method: ' + req.method + ' \n');
    } catch (e) {
        next(e);
    }
});

module.exports = router;