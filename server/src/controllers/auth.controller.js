const jwt = require('jsonwebtoken');

const UserService = require('../services/user.service');
const { generateLoginToken } = require('../utilities/token');
const { comparePassword } = require('../utilities/password');
const AppError = require('../utilities/AppError');

require('dotenv').config();

exports.login = async (req, res, next) => {
  try {
    const user = await UserService.findUserByUsername(req.body.username, req.body.role);
    if (!user) throw new AppError('Kullanıcı bulunamadı', 404);
    const valid = comparePassword(req.body.password, user.password);
    if (!valid) throw new AppError('Geçersiz Şifre veya Kullanıcı Adı', 400);
    user.password = undefined;
    return res.status(200).json({ token: generateLoginToken(user), user });
  } catch (error) {
    next(error);
  }
};

exports.checkToken = async (req, res, next) => {
  try {
    let { token } = req.body;
    if (!token) {
      throw new AppError('Token bulunamadı', 401);
    }
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft();
    }
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) throw new AppError('Token geçersiz', 400);
    return res.status(200).json({ message: 'Token geçerli' });
  } catch (error) {
    next(error);
  }
};
