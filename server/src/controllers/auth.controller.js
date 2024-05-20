const jwt = require('jsonwebtoken');

const UserService = require('../services/user.service');
const { generateLoginToken } = require('../utilities/token');
const { comparePassword } = require('../utilities/password');
const AppError = require('../utilities/AppError');

require('dotenv').config();

exports.login = async (req, res, next) => {
  try {
    const user = await UserService.findUserByEmail(req.body.email, req.body.role);
    if (!user) throw new AppError('Kullanıcı bulunamadı', 404);
    const valid = comparePassword(req.body.password, user.password);
    if (!valid) throw new AppError('Geçersiz Şifre veya E-Posta', 400);
    user.password = undefined;
    return res.status(200).json({ token: generateLoginToken(user), user });
  } catch (error) {
    next(error);
  }
};

exports.validateToken = async (req, res, next) => {
  try {
    const { token } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserService.findUserByEmail(decoded.email, decoded.role);
    if (!user) throw new AppError('Kullanıcı bulunamadı', 404);
    user.password = undefined;
    return res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};
