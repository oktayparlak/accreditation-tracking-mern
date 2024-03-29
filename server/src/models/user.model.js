const { DataTypes } = require('sequelize');

const sequelize = require('../configs/database');
const roles = require('../helpers/roles');

const User = sequelize.define(
  'User',
  {
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
      type: DataTypes.STRING(60),
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
        roles.COURSE_SUPERVISOR,
        ''
      ),
      allowNull: true,
    },
  },
  {
    hooks: {
      afterSync: async () => {
        const user = await User.findOne({ where: { username: 'oktayparlak' } });
        if (!user) {
          await User.create({
            username: 'oktayparlak',
            firstName: 'Oktay',
            lastName: 'Parlak',
            role: roles.ROOT_ADMIN,
            password: '$2a$10$A.PBdzyO.JWayCnV1CRWhur/r/jHJ6W6CllMBLVminMKozVEyOQe.',
          });
        }
      },
    },
  }
);

module.exports = User;
