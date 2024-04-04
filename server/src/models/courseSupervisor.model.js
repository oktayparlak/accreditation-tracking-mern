const { DataTypes } = require('sequelize');

const sequelize = require('../configs/database');

const CourseSupervisor = sequelize.define(
  'CourseSupervisor',
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
    courseId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = CourseSupervisor;
