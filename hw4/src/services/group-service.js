const db = require('../data-access/index');
const Group = db.groups;

const getGroups = (limit) => {
    return Group.findAll({} , limit);
}

const createGroup = (body) => {
    const { id, name, permissions } = body;
    return Group.create({
        id,
        name,
        permissions
    })
}

module.exports = {
    getGroups,
    createGroup
}