const { DataTypes } = require('sequelize');

const sequelize = require('../configs/database');

const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  courseId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

module.exports = Application;
