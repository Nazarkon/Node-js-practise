'use strict';

var _require = require('sequelize'),
    DataTypes = _require.DataTypes;

module.exports = function (sequelize) {
    return sequelize.define('users', {
        userID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false
        },
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        freezeTableName: true
    });
};