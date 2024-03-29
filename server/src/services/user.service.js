const User = require('../models/user.model');
const AppError = require('../utilities/AppError');
const { hashPassword } = require('../utilities/password');

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
