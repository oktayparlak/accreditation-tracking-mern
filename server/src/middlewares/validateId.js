const uuid = require('uuid');

module.exports = (req, res, next) => {
  try {
    for (let item in req.params) {
      if (!req.params[item]) {
        return res.status(400).json({ error: { message: 'Id is required' } });
      }
      if (!uuid.validate(req.params[item])) {
        return res.status(400).json({ error: { message: 'Invalid id' } });
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};
