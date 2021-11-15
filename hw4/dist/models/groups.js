'use strict';

var _require = require('sequelize'),
    DataTypes = _require.DataTypes;

module.exports = function (sequelize) {
    return sequelize.define('Groups', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        permissions: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true
    });
};