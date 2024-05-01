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
    email: {
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
        const user = await User.findOne({ where: { email: 'admin@mail.com' } });
        if (!user) {
          await User.create({
            email: 'admin@mail.com',
            firstName: 'Root',
            lastName: 'Admin',
            role: roles.ROOT_ADMIN,
            password: '$2a$10$Mg0hiIFO9yy5htTzhE2RDu3qTpBMPXmzjl3b9/ca4BuA0CD8Rz16G',
          });
        }
      },
    },
  }
);

module.exports = User;
