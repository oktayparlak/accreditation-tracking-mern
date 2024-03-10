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

  async findUserById(id) {
    return await User.findByPk({ where: { id, isDeleted: false } }, { attributes: { exclude: excludeColums } });
  }

  async findUserByUsername(username) {
    return await User.findOne({ where: { username: username }, isDeleted: false }, { attributes: { exclude: excludeColums } });
  }

  async findAllUsers() {
    return await User.findAll({ where: { isDeleted: false } }, { attributes: { exclude: excludeColums } });
  }

  async updateUser(id, data) {
    const user = await User.update({ where: { id } }, data);
    excludeColums.map((column) => {
      user[column] = undefined;
    });
    return user;
  }

  deleteUser(id) {
    User.update({ where: { id } }, { isDeleted: true })
      .then(() => {
        return true;
      })
      .catch((error) => {
        throw error;
      });
  }
}

module.exports = new UserService();
