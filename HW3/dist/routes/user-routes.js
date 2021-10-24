'use strict';

var express = require('express');
var Joi = require('joi');
var router = express.Router();

var _require = require('../controllers/user-controllers'),
    getUsers = _require.getUsers,
    createUser = _require.createUser,
    getUserById = _require.getUserById,
    updateUserById = _require.updateUserById,
    deleteUserById = _require.deleteUserById;

var schema = Joi.object({
    id: Joi.number().required(),
    login: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(8).max(20).required(),
    age: Joi.number().min(4).max(130).required(),
    isDeleted: Joi.boolean().required()

});

var validation = function validation(userSchema) {
    return function (req, res, next) {
        var _userSchema$validate = userSchema.validate(req.body),
            error = _userSchema$validate.error;

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