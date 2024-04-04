const User = require('../models/user.model');
const FacultyAdmin = require('../models/facultyAdmin.model');
const DepartmentAdmin = require('../models/departmentAdmin.model');
const CourseSupervisor = require('../models/courseSupervisor.model');
const AppError = require('../utilities/AppError');
const { hashPassword } = require('../utilities/password');
const CourseAdmin = require('../models/courseAdmin.model');

const excludeColums = ['password', 'createdAt', 'updatedAt'];

class UserService {
  async createUser(data) {
    const user = User.build({
      ...data,
      password: hashPassword(data.password),
    });
    await user.save();
    excludeColums.forEach((column) => {
      user[column] = undefined;
    });
    return user;
  }

  async findUserById(id) {
    return await User.findOne({
      where: { id },
      attributes: { exclude: excludeColums },
    });
  }

  async findUserByUsername(username, role) {
    return await User.findOne({
      where: { username, role },
      attributes: { exclude: [excludeColums - 'password'] },
    });
  }

  async findAllUsers() {
    return await User.findAll({
      attributes: { exclude: excludeColums },
      order: [['updatedAt', 'DESC']],
    });
  }

  async findUsersWithoutRole() {
    return await User.findAll({
      where: { role: '' },
      attributes: { exclude: excludeColums },
    });
  }

  async findUsersWithRole(role) {
    let data = [];
    const users = await User.findAll({ where: { role: role } });
    if (role === 'FACULTY_ADMIN') {
      for (const user of users) {
        const facultyAdmin = await FacultyAdmin.findOne({ where: { userId: user.dataValues.id } });
        if (!facultyAdmin) {
          data.push(user);
        }
      }
    }
    if (role === 'DEPARTMENT_ADMIN') {
      for (const user of users) {
        const departmentAdmin = await DepartmentAdmin.findOne({
          where: { userId: user.dataValues.id },
        });
        if (!departmentAdmin) {
          data.push(user);
        }
      }
    }
    if (role === 'COURSE_ADMIN') {
      for (const user of users) {
        const courseAdmin = await CourseAdmin.findOne({
          where: { userId: user.dataValues.id },
        });
        if (!courseAdmin) {
          data.push(user);
        }
      }
    }
    if (role === 'COURSE_SUPERVISOR') {
      for (const user of users) {
        const courseSupervisor = await CourseSupervisor.findOne({
          where: { userId: user.dataValues.id },
        });
        if (!courseSupervisor) {
          data.push(user);
        }
      }
    }
    return data;
  }

  async updateUser(id, data) {
    if (data.password !== '') {
      data.password = hashPassword(data.password);
    } else {
      delete data.password;
    }
    const user = await User.update(data, { where: { id } });
    excludeColums.forEach((column) => {
      user[column] = undefined;
    });
    return user;
  }

  async deleteUser(id) {
    await User.destroy({ where: { id } })
      .then(() => {
        return true;
      })
      .catch((error) => {
        throw error;
      });
  }
}

module.exports = new UserService();
