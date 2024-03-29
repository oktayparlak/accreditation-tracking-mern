const { DataTypes } = require('sequelize');

const sequelize = require('../configs/database');

const MeasuringTool = sequelize.define('MeasuringTool', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  impactRate: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = MeasuringTool;
