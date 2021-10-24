const db = require('../db/index');
const User = db.user;

const getUsers = (req, res) => {
    const { loginSubstring = '', limit = 10 } = req.query;
    User.findAll({  where: {
        login: loginSubstring
    },
    limit }).then((result) => {
        res.send(result).sendStatus(201);
    }).catch(error => {
        res.sendStatus(404).send(error);
    });
};

const getUserById = (req, res) => {
    const userId = +req.params.id;
    User.findAll({
        where: {
            id: userId
        }
    }).then((result) => {
        res.send(result).sendStatus(201);
    }).catch(error => {
        res.sendStatus(404).send(error);
    });
};

const createUser = (req, res) => {
    if (Object.entries(req.body).length !== 0) {
        console.log(req.body, 'body');
        const { id, login, password, age, isDeleted } = req.body;
        User.create({
            id,
            login,
            password,
            age,
            isDeleted
        }).then(result => {
            console.log(result);
            res.sendStatus(201);
        }).catch(error => {
            console.log(error);
            res.end('error');
        });
    } else {
        res.sendStatus(403);
    }
};

const updateUserById = (req, res) => {
    if (Object.values(req.body).length) {
        const userId = +req.params.id;
        const { login, password, age, isDeleted } = req.body;
        const updateObject = {};
        if (login) {
            updateObject.login = login;
        }
        if (password) {
            updateObject.password = password;
        }
        if (age) {
            updateObject.age = age;
        }
        if (isDeleted) {
            updateObject.isDeleted = isDeleted;
        }


        User.update(updateObject, {
            where: {
                id: userId
            }
        }).then((result) => {
            res.sendStatus(201).send(result);
        }).catch((error) => {
            res.sendStatus(500).send(error);
        });
    } else {
        res.sendStatus(403).send('No data provided');
    }
};

const deleteUserById = (req, res) => {
    const userId = +req.params.id;
    User.destroy({
        where: {
            id: userId
        }
    }).then(() => {
        res.sendStatus(201).send('User is Deleted');
    }).catch(() => {
        res.sendStatus(404).send("Can't find user with such id");
    });
};

module.exports = {
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    createUser
};
