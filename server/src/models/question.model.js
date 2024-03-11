const { DataTypes } = require('sequelize');

const sequelize = require('../configs/database');

const Question = sequelize.define('Question', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  measuringToolId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  average: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  fullPoint: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Question;
