const express = require('express');
const router = express.Router();
const { getUserGroups, addUsersToGroup, removeAllRelation } = require('../services/userGroup-service');



router.get('/userGroup', async (req, res) => {
    try{
        const data = await getUserGroups()
        res.send(data).sendStatus(200).end();

    }catch(e){
        res.send(e).sendStatus(400).end();
    }
})

router.post('/userGroup', async (req,res) => {
    try {
        if (Object.entries(req.body).length !== 0) {
        const { groupId, usersId } = req.body
        const data = await addUsersToGroup(groupId, usersId)
        res.sendStatus(200).send(data).end();
        } else {
            res.status(400).end()
        }

    }catch(e){
        res.send(e).sendStatus(400).end();
    }
})

router.delete('/userGroup/:userId', async (req, res) => {
    try{
        const data = await removeAllRelation(req.params.userId);
        res.send("Deleted").status(200).end();
    }catch(e){
        res.send(e).status(400).end();
    }
})

module.exports = router;

