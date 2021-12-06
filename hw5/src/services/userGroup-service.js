const db = require('../data-access/index');

// import instance of DB tables
const UserGroup = db.UserGroup
const User = db.User;
const Group = db.Groups;


const getUserGroups = () => {
    return UserGroup.findAll()
}

const addUsersToGroup = async (groupId, usersId) => {
    try {
          await db.sequelize.transaction(async (t) => {
            const user = await User.findOne({where: { id: usersId  }})
            const group = await Group.findOne({where: { id: groupId }})
            await user.addUser(group)
        })

    }catch(e){
        console.log(e)
    }
}

const removeAllRelation = (userId) => {
    return User.destroy({where: {id: userId}, force: true})
}

module.exports = {
    getUserGroups,
    addUsersToGroup,
    removeAllRelation
}