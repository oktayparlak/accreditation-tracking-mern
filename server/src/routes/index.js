module.exports = (app) => {
  app.use('/api/auths', require('./auth.route'));
  app.use('/api/users', require('./user.route'));
};
