const { DataTypes } = require('sequelize');

const sequelize = require('../configs/database');

const FacultyAdmin = sequelize.define(
  'FacultyAdmin',
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
    },
    facultyId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: false }
);

module.exports = FacultyAdmin;
