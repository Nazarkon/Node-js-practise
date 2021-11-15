'use strict';

var express = require('express');
var Joi = require('joi');

var _require = require('../services/group-service'),
    getGroups = _require.getGroups,
    createGroup = _require.createGroup;

var router = express.Router();

var shema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().min(3).max(30).required(),
    permissions: Joi.string().case('upper')
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

router.get('/group', async function (req, res) {});

router.post('/group', validation(shema), async function (req, res) {
    try {
        if (Object.entries(req.body).length !== 0) {
            var data = await createGroup(req.body);
            res.send("Created").status(201).end();
        } else {
            res.status(400).end();
        }
    } catch (e) {
        res.send(e).status(400).end();
    }
});

module.exports = router;