const express = require('express');
const app = express();
const Joi = require('joi');
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.json());

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

const users = [
];

app.get('/users', (req, res) => {
    if (users.length) {
        const { loginSubstring = '', limit = 10 } = req.query;
        const list = users
            .filter(user => user.login.includes(loginSubstring))
            .sort((a, b) => a.login.localeCompare(b.login))
            .slice(0, limit);
        res.send(list);
    } else {
        res.sendStatus(404).send('User Data is empty');
    }
});

app.post('/user', validation(schema), (req, res) => {
    if (Object.entries(req.body).length !== 0) {
        users.push(req.body);
        res.sendStatus(201);
    } else {
        res.sendStatus(403);
    }
});
app.get('/user/:id', (req, res) => {
    if (users.length) {
        const chosenUser = users.filter((item) => item.id === +req.params.id);
        res.send(chosenUser);
    } else {
        res.sendStatus(404).send('not found');
    }
});
app.put('/user/:id', (req, res) => {
    if (Object.values(req.body).length) {
        const { login, password, age, isDeleted } = req.body;
        const index = users.findIndex((item) => item.id === parseInt(req.params.id, 10));
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
app.delete('/user/:id', (req, res) => {
    const deletedUser = users.findIndex((item) => item.id === parseInt(req.params.id, 10));
    if (deletedUser !== -1) {
        users[deletedUser].isDeleted = true;
        res.send('User is Deleted');
    } else {
        res.sendStatus(404).send("Can't find user with such id");
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
