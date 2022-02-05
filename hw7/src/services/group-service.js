const db = require('../data-access/index');

// import instance of DB table
const Group = db.Groups;

const getGroups = (limit) => {
    return Group.findAll({} , limit);
}

const createGroup = (body) => {
    const { name, permissions } = body;
    return Group.create({
        name,
        permissions
    })
}

const updateGroupById = (groupId, body) => {
    const { name, permissions } = body
    const updatedObject  =  {};
    if(name) {
        updatedObject.name = name
    }

    if(permissions) {
        updatedObject.permissions = permissions
    } 

    return Group.update(updatedObject, {
        where: {
            id: groupId
        }
    })
}

const getGroupById = (id) => {
    const groupId = id;
    console.log(groupId, 'groupId')
    return Group.findAll({
        where: {
            id: groupId
        }
    })
}

const deleteGroupById = (id) => {
    const groupId = id;
    console.log(groupId, 'groupId')
    return Group.destroy({
        where: {
            id: groupId
        }
    })
}

module.exports = {
    getGroups,
    createGroup,
    updateGroupById,
    getGroupById,
    deleteGroupById,

}