const uuid = require('uuid');

module.exports = (req, res, next) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ error: { message: 'Id is required' } });
    }
    if (!uuid.validate(req.params.id)) {
      return res.status(400).json({ error: { message: 'Invalid id' } });
    }
    next();
  } catch (error) {
    next(error);
  }
};
