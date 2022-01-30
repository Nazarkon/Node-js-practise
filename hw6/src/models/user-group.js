const { DataTypes } = require('sequelize');

module.exports = function(sequelize) {
    return sequelize.define('userGroup', {
        userGroupId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }, { timestamps: false } );
}