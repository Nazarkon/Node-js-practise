const express = require('express');
const Joi = require('joi');
const { getGroups, createGroup, getGroupById, deleteGroupById ,updateGroupById } = require('../services/group-service');
const router = express.Router();

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
    }catch(e){
         res.send(e).sendStatus(400).end();
    }

});

router.post('/group', validation(shema), async (req,res) => {
    try {
        if (Object.entries(req.body).length !== 0) {
            const data = await createGroup(req.body)
            res.send("Created").status(201).end();
        } else {
            res.status(400).end();
        }
    }catch(e){
        res.send(e).status(400).end();
    } 
})

router.get('/group/:id', async(req,res) => {
    try{
        const data = await getGroupById(req.params.id)
        res.send(data).status(200).end();
    }catch(e) {
        res.send(e).status(400).end();
    }
})

router.put('/group/:id', async (req,res) => {
    try{
        if (Object.values(req.body).length) {
            const data = await updateGroupById(req.params.id, req.body);
            res.send(data).status(201).end();
        } else {
            res.status(400).end();
        }
    }catch(e){
        res.send(e).status(400).end();
    }
})

router.delete('/group/:id', async (req, res) => {
    try{
        const data = await deleteGroupById(req.params.id);
        res.send("Deleted").status(200).end();

    }catch(e){
        res.send(e).status(400).end();
    }
})

module.exports = router;