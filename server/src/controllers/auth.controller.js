const UserService = require('../services/user.service');
const { generateLoginToken } = require('../helpers/token');
const { comparePassword } = require('../helpers/password');

exports.login = async (req, res, next) => {
  try {
    const user = await UserService.findUserWithData(req.body);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const valid = comparePassword(req.body.password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid password' });
    return res.status(200).json({ token: generateLoginToken(user) });
  } catch (error) {
    next(error);
  }
};
