'use strict';

var express = require('express');
var router = express.Router();

var _require = require('../services/userGroup-service'),
    getUserGroups = _require.getUserGroups,
    addUsersToGroup = _require.addUsersToGroup,
    removeAllRelation = _require.removeAllRelation;

var _require2 = require('../helper/helper'),
    ErrorHandler = _require2.ErrorHandler;

router.get('/userGroup', async function (req, res, next) {
    try {
        var data = await getUserGroups();
        res.send(data).sendStatus(200).end();
        logger.info('StatusCode: 200 \n\n                      method: ' + req.method + ' \n');
    } catch (e) {
        next(e);
    }
});

router.post('/userGroup', async function (req, res, next) {
    try {
        if (Object.entries(req.body).length !== 0) {
            var _req$body = req.body,
                groupId = _req$body.groupId,
                usersId = _req$body.usersId;

            var data = await addUsersToGroup(groupId, usersId);
            res.sendStatus(200).send(data).end();
            logger.info('StatusCode: 200 \n\n                      method: ' + req.method + ' \n');
        } else {
            res.status(400).end();
        }
    } catch (e) {
        next(e);
    }
});

router.delete('/userGroup/:userId', async function (req, res, next) {
    try {
        var data = await removeAllRelation(req.params.userId);
        res.send("Deleted").status(200).end();
        logger.info('StatusCode: 200 \n\n                     userId: ' + req.params.id + ' \n\n                      method: ' + req.method + ' \n');
    } catch (e) {
        next(e);
    }
});

module.exports = router;