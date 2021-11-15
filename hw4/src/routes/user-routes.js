const express = require('express');
const Joi = require('joi');
const router = express.Router();
const { getUsers, createUser, getUserById, updateUserById, deleteUserById } = require('../services/user-services');

const schema = Joi.object({
    id: Joi.number().required(),
    login: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(8).max(20).required(),
    age: Joi.number().min(4).max(130).required(),
    isDeleted: Joi.boolean().required()

});

const validation = (userSchema) => {
    return (req, res, next) => {
        const { error } = userSchema.validate(req.body);

        if (error) {
            res.status(400).json(error.message).end();
        }
        next();
    };
};

router.get('/users',  async (req,res) => {
    const { loginSubstring = '', limit = 10 } = req.query;
    try{
    const data = await getUsers(loginSubstring, limit)
         res.send(data).status(200).end();
    }catch(e){
         res.send(e).sendStatus(400).end();
    }
});
router.post('/user', validation(schema), async (req,res) => {
    try{
        if (Object.entries(req.body).length !== 0) {
            const data = await createUser(req.body)
            res.send("Created").status(201).end();
        } else {
            res.status(400).end();
        }
    }catch(e){
            res.send(e).status(400).end();
    } 

});
router.get('/user/:id', async (req,res) => {
    try{
        const data = await getUserById(req.params.id)
        res.send(data).status(200).end();
    }catch(e) {
        res.send(e).status(400).end();
    }
});
router.put('/user/:id',validation(schema),async (req,res) => {
    try{
        if (Object.values(req.body).length) {
            const data = await updateUserById(+req.params.id, req.body);
            res.send(data).status(201).end();
        } else {
            res.status(400).end();
        }
    }catch(e){
        res.send(e).status(400).end();
    }

});
router.delete('/user/:id', async(req,res) => {
    try{
        const data = deleteUserById(userId);
        res.send("Deleted").status(200).end();

    }catch(e){
        res.send(e).status(400).end();
    }
});

module.exports = router;
