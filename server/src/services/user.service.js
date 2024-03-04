const User = require('../models/user.model');

class UserService {
  async createUser(data) {
    const user = await User.create(data);
    user.password = undefined;
    return user;
  }

  async findUserByPk(id) {
    return await User.findByPk({ where: { id, isDeleted: false } }, { attributes: { exclude: ['password'] } });
  }

  async findAllUser() {
    return await User.findAll({ where: { isDeleted: false } }, { attributes: { exclude: ['password'] } });
  }

  async updateUser(id, data) {
    return await User.update({ where: { id } }, data);
  }

  async deleteUser(id) {
    const user = await User.update({ where: { id } }, { isDeleted: true });
    user.password = undefined;
    return user;
  }
}

module.exports = new UserService();
