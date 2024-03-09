const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateLoginToken = (user) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
  return token;
};

const generateRefreshToken = (user) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_EXPIRATION,
  });
  return token;
};

module.exports = { generateLoginToken, generateRefreshToken };
