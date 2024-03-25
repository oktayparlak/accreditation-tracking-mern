const User = require('../models/user.model');
const AppError = require('../utilities/AppError');
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

  async findUserByUsername(username, role) {
    return await User.findOne({
      where: { username, role, isDeleted: false },
      attributes: { exclude: [excludeColums - 'password'] },
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

  async deleteUser(id) {
    const user = await User.findOne({ where: { id } });
    if (!user) throw new AppError('User not found', 404);
    user.isDeleted = true;
    await user.save();
    return user;
  }
}

module.exports = new UserService();
