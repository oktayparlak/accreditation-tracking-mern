module.exports = (app) => {
  app.use('/api/auths', require('./auth.route'));
  app.use('/api/courses', require('./course.route'));
  app.use('/api/departments', require('./department.route'));
  app.use('/api/users', require('./user.route'));
  app.use('/api/course-admins', require('./courseAdmin.route'));
  app.use('/api/department-admins', require('./departmentAdmin.route'));
  app.use('/api/learning-materials', require('./learningMaterial.route'));
  app.use('/api/faculties', require('./faculty.route'));
  app.use('/api/faculty-admins', require('./facultyAdmin.route'));
  app.use('/api/measuring-tools', require('./measuringTool.route'));
  app.use('/api/course-supervisors', require('./courseSupervisor.route'));
};
