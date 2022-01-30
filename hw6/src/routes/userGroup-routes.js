const express = require('express');
const router = express.Router();
const { getUserGroups, addUsersToGroup, removeAllRelation } = require('../services/userGroup-service');
const  checkTokenEquality = require('../helper/authenticate')



router.get('/userGroup', checkTokenEquality , async (req, res , next) => {
    try{
        const data = await getUserGroups()
        res.send(data).sendStatus(200).end();

    }catch(e){
        next(e)
    }
})

router.post('/userGroup', checkTokenEquality,  async (req,res,next) => {
    try {
        if (Object.entries(req.body).length !== 0) {
        const { groupId, usersId } = req.body
        const data = await addUsersToGroup(groupId, usersId)
        res.sendStatus(200).send(data).end();
        } else {
            res.status(400).end()
        }

    }catch(e){
        next(e)
    }
})

router.delete('/userGroup/:userId', checkTokenEquality , async (req, res, next) => {
    try{
        const data = await removeAllRelation(req.params.userId);
        res.send("Deleted").status(200).end();
    }catch(e){
        next(e)
    }
})

module.exports = router;

