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
            res.status(400).json(error.message);
        }
        next();
    };
};

router.get('/users', getUsers);
router.post('/user', validation(schema), createUser);
router.get('/user/:id', getUserById);
router.put('/user/:id', updateUserById);
router.delete('/user/:id', deleteUserById);

module.exports = router;
