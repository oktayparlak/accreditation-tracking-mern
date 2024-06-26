const { DataTypes } = require('sequelize');
const DepartmentMaterial = require('./departmentMaterial.model');

const sequelize = require('../configs/database');

const LearningMaterial = sequelize.define('LearningMaterial', {
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
  departmentMaterials: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false,
  },
  courseId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  contributionLevel: {
    type: DataTypes.ENUM('1', '2', '3', '4', '5'),
    allowNull: false,
  },
  impactSum: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.0,
  },
  impactTotal: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.0,
  },
  succesRate: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.0,
  },
  succesPoint: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.0,
  },
});

module.exports = LearningMaterial;
