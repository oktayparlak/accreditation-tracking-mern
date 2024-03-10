const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateLoginToken = (user) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  return token;
};

module.exports = { generateLoginToken };
