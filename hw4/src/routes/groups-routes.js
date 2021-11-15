const express = require('express');
const Joi = require('joi');
const { getGroups, createGroup } = require('../services/group-service');
const router = express.Router();

const shema = Joi.object({
    id: Joi.number().required(),
    name:Joi.string().min(3).max(30).required(),
    permissions: Joi.string().case('upper')
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

module.exports = router;