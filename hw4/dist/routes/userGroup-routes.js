'use strict';

var express = require('express');
var router = express.Router();

var _require = require('../services/userGroup-service'),
    getUserGroups = _require.getUserGroups,
    addUsersToGroup = _require.addUsersToGroup,
    removeAllRelation = _require.removeAllRelation;

router.get('/userGroup', async function (req, res) {
    try {
        var data = await getUserGroups();
        res.send(data).sendStatus(200).end();
    } catch (e) {
        res.send(e).sendStatus(400).end();
    }
});

router.post('/userGroup', async function (req, res) {
    try {
        if (Object.entries(req.body).length !== 0) {
            var _req$body = req.body,
                groupId = _req$body.groupId,
                usersId = _req$body.usersId;

            var data = await addUsersToGroup(groupId, usersId);
            res.sendStatus(200).send(data).end();
        } else {
            res.status(400).end();
        }
    } catch (e) {
        res.send(e).sendStatus(400).end();
    }
});

router.delete('/userGroup/:userId', async function (req, res) {
    try {
        var data = await removeAllRelation(req.params.userId);
        res.send("Deleted").status(200).end();
    } catch (e) {
        res.send(e).status(400).end();
    }
});

module.exports = router;