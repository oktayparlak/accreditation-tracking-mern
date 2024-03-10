module.exports = (app) => {
  app.use('/api/auths', require('./auth.route'));
  app.use('/api/courses', require('./course.route'));
  app.use('/api/departments', require('./department.route'));
  app.use('/api/users', require('./user.route'));
};
