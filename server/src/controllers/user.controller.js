const UserService = require('../services/user.service');
const AppError = require('../utilities/AppError');

/** Create */
exports.create = async (req, res, next) => {
  try {
    const user = await UserService.createUser(req.body);
    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

/** Read */
exports.getAll = async (req, res, next) => {
  try {
    const users = await UserService.findAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const user = await UserService.findUserById(req.params.id);
    if (!user) throw new AppError('User not found', 404);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

exports.getUsersWithoutRole = async (req, res, next) => {
  try {
    const users = await UserService.findUsersWithoutRole();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

exports.getUsersWithRole = async (req, res, next) => {
  try {
    const users = await UserService.findUsersWithRole(req.query.role);
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

/** Update */
exports.update = async (req, res, next) => {
  try {
    const user = await UserService.updateUser(req.params.id, req.body);
    if (!user) throw new AppError('User not found', 404);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

exports.setAdminRole = async (req, res, next) => {
  try {
    const user = await UserService.setAdminRole(req.params.id);
    if (!user) throw new AppError('User not found', 404);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

/** Delete */
exports.delete = async (req, res, next) => {
  try {
    const user = await UserService.deleteUser(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
