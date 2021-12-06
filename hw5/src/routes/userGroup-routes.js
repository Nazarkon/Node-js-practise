const express = require('express');
const router = express.Router();
const { getUserGroups, addUsersToGroup, removeAllRelation } = require('../services/userGroup-service');
const { ErrorHandler } = require('../helper/helper');



router.get('/userGroup', async (req, res , next) => {
    try{
        const data = await getUserGroups()
        res.send(data).sendStatus(200).end();
        logger.info(`StatusCode: 200 \n
                      method: ${req.method} \n`)

    }catch(e){
        next(e)
    }
})

router.post('/userGroup', async (req,res,next) => {
    try {
        if (Object.entries(req.body).length !== 0) {
        const { groupId, usersId } = req.body
        const data = await addUsersToGroup(groupId, usersId)
        res.sendStatus(200).send(data).end();
        logger.info(`StatusCode: 200 \n
                      method: ${req.method} \n`)
        } else {
            res.status(400).end()
        }

    }catch(e){
        next(e)
    }
})

router.delete('/userGroup/:userId', async (req, res, next) => {
    try{
        const data = await removeAllRelation(req.params.userId);
        res.send("Deleted").status(200).end();
        logger.info(`StatusCode: 200 \n
                     userId: ${req.params.id} \n
                      method: ${req.method} \n`)
    }catch(e){
        next(e)
    }
})

module.exports = router;

