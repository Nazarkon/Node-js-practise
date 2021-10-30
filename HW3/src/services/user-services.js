const db = require('../data-access/index');
const User = db.user;

const getUsers = (loginSubstring, limit) => {
    return User.findAll({  where: {
        login: loginSubstring
    },
    limit })
};

const getUserById = (id) => {
    const userId = +id;
    return User.findAll({
        where: {
            id: userId
        }
    })
};

const createUser = (body) => {
        const { id, login, password, age, isDeleted } = body;
        return User.create({
            id,
            login,
            password,
            age,
            isDeleted
        })
};

const updateUserById = (userId,body) => {
        const { login, password, age, isDeleted } = body;
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


        return User.update(updateObject, {
            where: {
                id: userId
            }
        })
};

const deleteUserById = (id) => {
    const userId = +id;
    return User.destroy({
        where: {
            id: userId
        }
    })
};

module.exports = {
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    createUser
};
