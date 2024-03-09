const User = require('../models/user.model');
const { hashPassword } = require('../utilities/password');

let excludeColums = ['password', 'isDeleted', 'createdAt', 'updatedAt'];

class UserService {
  async createUser(data) {
    const user = await User.create({ password: hashPassword(data.password), ...data });
    excludeColums.map((column) => {
      user[column] = undefined;
    });
    return user;
  }

  async findUserByPk(id) {
    return await User.findByPk({ where: { id, isDeleted: false } }, { attributes: { exclude: excludeColums } });
  }

  async findUserByUsername(username) {
    return await User.findOne({ where: { username: username }, isDeleted: false }, { attributes: { exclude: excludeColums } });
  }

  async findAllUsers() {
    return await User.findAll({ where: { isDeleted: false } }, { attributes: { exclude: excludeColums } });
  }

  async updateUser(id, data) {
    return await User.update({ where: { id } }, data);
  }

  async deleteUser(id) {
    const user = await User.update({ where: { id } }, { isDeleted: true });
    excludeColums.map((column) => {
      user[column] = undefined;
    });
    return user;
  }
}

module.exports = new UserService();
