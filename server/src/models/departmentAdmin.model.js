const { DataTypes } = require('sequelize');

const sequelize = require('../configs/database');

const DepartmentAdmin = sequelize.define(
  'DepartmentAdmin',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
    },
    departmentId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = DepartmentAdmin;
