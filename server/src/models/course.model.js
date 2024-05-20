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
  academicYear: {
    type: DataTypes.STRING(9),
    allowNull: false,
  },
  term: {
    type: DataTypes.ENUM('FALL', 'SPRING'),
    allowNull: false,
  },
  studentCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  compulsory: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Course;
