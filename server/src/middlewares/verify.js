const jwt = require('jsonwebtoken');
require('dotenv').config();

const AppError = require('../utilities/AppError');

module.exports = (req, res, next) => {
  let token = req.header('Authorization');
  console.log('token', token);
  if (!token) {
    throw new AppError('Token bulunamadı', 401);
  }
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length).trimLeft();
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
