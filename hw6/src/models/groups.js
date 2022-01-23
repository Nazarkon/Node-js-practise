const { DataTypes } = require('sequelize');

module.exports = function(sequelize) {
    return sequelize.define('groups', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull:false
        },
        permissions: {
            type : DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: null,
            allowNull: false
        }
    }, {
        freezeTableName: true
    });
};