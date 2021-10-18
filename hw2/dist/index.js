'use strict';

var express = require('express');
var app = express();
var Joi = require('joi');
var bodyParser = require('body-parser');
var port = 3000;

app.use(bodyParser.json());

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

var users = [];

app.get('/users', function (req, res) {
    if (users.length) {
        var _req$query = req.query,
            _req$query$loginSubst = _req$query.loginSubstring,
            loginSubstring = _req$query$loginSubst === undefined ? '' : _req$query$loginSubst,
            _req$query$limit = _req$query.limit,
            limit = _req$query$limit === undefined ? 10 : _req$query$limit;

        var list = users.filter(function (user) {
            return user.login.includes(loginSubstring);
        }).sort(function (a, b) {
            return a.login.localeCompare(b.login);
        }).slice(0, limit);
        res.send(list);
    } else {
        res.sendStatus(404).send('User Data is empty');
    }
});

app.post('/user', validation(schema), function (req, res) {
    if (Object.entries(req.body).length !== 0) {
        users.push(req.body);
        res.sendStatus(201);
    } else {
        res.sendStatus(403);
    }
});
app.get('/user/:id', function (req, res) {
    if (users.length) {
        var chosenUser = users.filter(function (item) {
            return item.id === +req.params.id;
        });
        res.send(chosenUser);
    } else {
        res.sendStatus(404).send('not found');
    }
});
app.put('/user/:id', function (req, res) {
    if (Object.values(req.body).length) {
        var _req$body = req.body,
            login = _req$body.login,
            password = _req$body.password,
            age = _req$body.age,
            isDeleted = _req$body.isDeleted;

        var index = users.findIndex(function (item) {
            return item.id === parseInt(req.params.id, 10);
        });
        console.log(users[index], 'users');
        if (login) {
            users[index].login = login;
        }
        if (password) {
            users[index].password = password;
        }
        if (age) {
            users[index].age = age;
        }
        if (isDeleted) {
            users[index].isDeleted = isDeleted;
        }
        res.end();
    } else {
        res.sendStatus(403).send('No data provided');
    }
});
app.delete('/user/:id', function (req, res) {
    var deletedUser = users.findIndex(function (item) {
        return item.id === parseInt(req.params.id, 10);
    });
    if (deletedUser !== -1) {
        users[deletedUser].isDeleted = true;
        res.send('User is Deleted');
    } else {
        res.sendStatus(404).send("Can't find user with such id");
    }
});

app.listen(port, function () {
    console.log('Example app listening at http://localhost:' + port);
});