const express = require('express');
const Joi = require('joi');
const { getGroups, createGroup, getGroupById, deleteGroupById ,updateGroupById } = require('../services/group-service');
const router = express.Router();
const { logger} = require('../helper/winstonLogger');

const shema = Joi.object({
    name:Joi.string().min(3).max(30).required(),
    permissions: Joi.array()
})

const validation = (groupSchema) => {
    return (req, res, next) => {
        console.log(req.body, 'body')
        const { error } = groupSchema.validate(req.body);

        if(error){
            res.status(400).json(error.message).end();
        }
        next();
    };
};


router.get('/group', async (req,res) => {
    const { limit = 10 } = req.query;
    try{
    const data = await getGroups(limit)
         res.send(data).status(200).end();
         logger.info(`StatusCode: 200 \n
                      limit: ${limit} \n
                      method: ${req.method} \n`)
    }catch(e){
        next(e)
    }

});

router.post('/group', validation(shema), async (req,res,next) => {
    try {
        if (Object.entries(req.body).length !== 0) {
            const data = await createGroup(req.body)
            res.send("Created").status(201).end();
            logger.info(`StatusCode: 201 \n
            method: ${req.method} \n`)
        } else {
            res.status(400).end();
            logger.info(`StatusCode: 400 \n
            method: ${req.method} \n`)
        }
    }catch(e){
        next(e)
    } 
})

router.get('/group/:id', async(req,res,next) => {
    try{
        const data = await getGroupById(req.params.id)
        res.send(data).status(200).end();
        logger.info(`StatusCode: 200 \n
            groupId: ${req.params.id} \n
            method: ${req.method} \n`)
    }catch(e) {
        next(e)
    }
})

router.put('/group/:id', async (req,res,next) => {
    try{
        if (Object.values(req.body).length) {
            const data = await updateGroupById(req.params.id, req.body);
            res.send(data).status(201).end();
            logger.info(`StatusCode: 201 \n
            groupId: ${req.params.id} \n
            method: ${req.method} \n`)
        } else {
            res.status(400).end();
            logger.info(`StatusCode: 201 \n
            groupId: ${req.params.id} \n
            method: ${req.method} \n`)
        }
    }catch(e){
        next(e)
    }
})

router.delete('/group/:id', async (req, res, next) => {
    try{
        const data = await deleteGroupById(req.params.id);
        res.send("Deleted").status(200).end();
        logger.info(`StatusCode: 200 \n
        groupId: ${req.params.id} \n
        method: ${req.method} \n`)

    }catch(e){
        next(e)
    }
})

module.exports = router;