const { DataTypes } = require('sequelize');

const sequelize = require('../configs/database');
const roles = require('../helpers/roles');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM(
      roles.ROOT_ADMIN,
      roles.FACULTY_ADMIN,
      roles.DEPARTMENT_ADMIN,
      roles.COURSE_ADMIN,
      roles.COURSE_SUPERVISOR
    ),
    allowNull: false,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = User;
