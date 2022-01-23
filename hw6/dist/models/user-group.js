'use strict';

var _require = require('sequelize'),
    DataTypes = _require.DataTypes;

module.exports = function (sequelize) {
    return sequelize.define('userGroup', {
        userGroupId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }, { timestamps: false });
};