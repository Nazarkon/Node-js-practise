'use strict';

var _require = require('sequelize'),
    DataTypes = _require.DataTypes;

module.exports = function (sequelize) {
    return sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
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