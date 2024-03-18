const UserService = require('../services/user.service');
const { generateLoginToken } = require('../utilities/token');
const { comparePassword } = require('../utilities/password');
const AppError = require('../utilities/AppError');

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
