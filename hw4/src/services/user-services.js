const db = require('../data-access/index');
const User = db.User;

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
            userID: userId
        }
    })
};

const createUser = (body) => {
        const { login, password, age, isDeleted } = body;
        return User.create({
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
                userID: userId
            }
        })
};

const deleteUserById = (id) => {
    const userId = +id;
    return User.destroy({
        where: {
            userID: userId
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
