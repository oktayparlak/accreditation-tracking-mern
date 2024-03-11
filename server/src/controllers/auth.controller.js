const UserService = require('../services/user.service');
const { generateLoginToken } = require('../utilities/token');
const { comparePassword } = require('../utilities/password');

exports.login = async (req, res, next) => {
  try {
    const user = await UserService.findUserByUsername(req.body.username, req.body.role);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const valid = comparePassword(req.body.password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid password' });
    user.password = undefined;
    return res.status(200).json({ token: generateLoginToken(user) });
  } catch (error) {
    next(error);
  }
};
