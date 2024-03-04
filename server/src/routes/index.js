module.exports = (app) => {
  app.use('/api/auth', require('./auth.route'));
  app.use('/api/users', require('./user.route'));
};
