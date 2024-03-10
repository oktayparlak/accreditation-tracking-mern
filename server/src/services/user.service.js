const User = require('../models/user.model');
const { hashPassword } = require('../utilities/password');

const excludeColums = ['password', 'isDeleted', 'createdAt', 'updatedAt'];

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
      where: { id, isDeleted: false },
      attributes: { exclude: excludeColums },
    });
  }

  async findUserByUsername(username) {
    return await User.findOne({
      where: { username: username },
      attributes: { exclude: excludeColums },
      isDeleted: false,
    });
  }

  async findAllUsers() {
    return await User.findAll({
      where: { isDeleted: false },
      attributes: { exclude: excludeColums },
    });
  }

  async updateUser(id, data) {
    const user = await User.update({ where: { id } }, data);
    excludeColums.forEach((column) => {
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
