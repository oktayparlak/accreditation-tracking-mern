const UserService = require('../services/user.service');

exports.create = async (req, res, next) => {};

exports.getAll = async (req, res, next) => {
  try {
    const users = await UserService.findAllUsers();
    if (!users || users.length === 0) return res.status(404).json({ error: { message: 'Users not found' } });
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const user = await UserService.findUserById(req.params.id);
    if (!user) return res.status(404).json({ error: { message: 'User not found' } });
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const user = await UserService.updateUser(req.params.id, req.body);
    if (!user) return res.status(404).json({ error: { message: 'User not found' } });
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

exports.delete = (req, res, next) => {
  try {
    const user = UserService.deleteUser(req.params.id);
    if (!user) return res.status(404).json({ error: { message: 'User not found' } });
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
