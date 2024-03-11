const Course = require('./course.model');
const CourseAdmin = require('./courseAdmin.model');
const Department = require('./department.model');
const DepartmentAdmin = require('./departmentAdmin.model');
const LearningMaterial = require('./learningMaterial.model');
const User = require('./user.model');

module.exports = () => {
  CourseAdmin.belongsTo(User, { foreignKey: 'userId' });
  CourseAdmin.belongsTo(Course, { foreignKey: 'courseId' });

  DepartmentAdmin.belongsTo(User, { foreignKey: 'userId' });
  DepartmentAdmin.belongsTo(Department, { foreignKey: 'departmentId' });

  User.hasOne(CourseAdmin, { foreignKey: 'userId' });
  User.hasOne(DepartmentAdmin, { foreignKey: 'userId' });

  Course.hasOne(CourseAdmin, { foreignKey: 'courseId' });
  Department.hasOne(DepartmentAdmin, { foreignKey: 'departmentId' });

  LearningMaterial.belongsTo(User, { foreignKey: 'userId' });
  User.hasMany(LearningMaterial, { foreignKey: 'userId' });
};
