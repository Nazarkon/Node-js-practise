const debug = require('debug')('express')
, express = require('express')
const Joi = require('joi');
const router = express.Router();
const { getUsers, createUser, getUserById, updateUserById, deleteUserById } = require('../services/user-services');
const  checkTokenEquality = require('../helper/authenticate')

const schema = Joi.object({
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

router.get('/users', checkTokenEquality , async (req,res, next) => {
    debug(req.method + ' ' + req.url);
    const { loginSubstring = '', limit = 10 } = req.query;
    try{
    const data = await getUsers(loginSubstring, limit)
         res.send(data).status(200).end();
    }catch(e){
       next(e)
    }
});
router.post('/user', validation(schema), async (req,res, next) => {
    try{
        if (Object.entries(req.body).length !== 0) {
            const data = await createUser(req.body)
            res.send("Created").status(201).end();
        } else {
            res.status(400).end();
        }
    }catch(e){
        next(e)
    } 

});
router.get('/user/:id', checkTokenEquality , async (req,res, next) => {
    try{
        const data = await getUserById(req.params.id)
        res.send(data).status(200).end();
    }catch(e) {
        next(e)
    }
});
router.put('/user/:id', checkTokenEquality, validation(schema),async (req,res) => {
    try{
        if (Object.values(req.body).length) {
            const data = await updateUserById(+req.params.id, req.body);
            res.send(data).status(201).end();
        } else {
            res.status(400).end();
        }
    }catch(e){
        next(e)
    }

});
router.delete('/user/:id', checkTokenEquality,  async(req,res, next) => {
    try{
        const data = await deleteUserById(+req.params.id);
        res.send("Deleted").status(200).end();

    }catch(e){
        next(e)
    }
});

module.exports = router;
