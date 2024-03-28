const { DataTypes } = require('sequelize');

const sequelize = require('../configs/database');

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  departmentId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  credit: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ects: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  compulsory: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Course;
