const Application = require('./application.model');
const Course = require('./course.model');
const CourseAdmin = require('./courseAdmin.model');
const Department = require('./department.model');
const DepartmentAdmin = require('./departmentAdmin.model');
const Faculty = require('./faculty.model');
const FacultyAdmin = require('./facultyAdmin.model');
const File = require('./file.model');
const LearningMaterial = require('./learningMaterial.model');
const MeasuringTool = require('./measuringTool.model');
const Question = require('./question.model');
const QuestionLearningMaterial = require('./questionLearningMaterial.model');
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

  Application.belongsTo(User, { foreignKey: 'userId' });
  User.hasMany(Application, { foreignKey: 'userId' });

  Application.belongsTo(Course, { foreignKey: 'courseId' });
  Course.hasMany(Application, { foreignKey: 'courseId' });

  File.belongsTo(Application, { foreignKey: 'applicationId' });
  Application.hasMany(File, { foreignKey: 'applicationId' });

  Question.belongsTo(MeasuringTool, { foreignKey: 'measuringToolId' });
  MeasuringTool.hasMany(Question, { foreignKey: 'measuringToolId' });

  QuestionLearningMaterial.belongsTo(Question, { foreignKey: 'questionId' });
  Question.hasMany(QuestionLearningMaterial, { foreignKey: 'questionId' });

  QuestionLearningMaterial.belongsTo(LearningMaterial, { foreignKey: 'learningMaterialId' });
  LearningMaterial.hasMany(QuestionLearningMaterial, { foreignKey: 'learningMaterialId' });

  FacultyAdmin.belongsTo(User, { foreignKey: 'userId' });
  User.hasOne(FacultyAdmin, { foreignKey: 'userId' });

  FacultyAdmin.belongsTo(Faculty, { foreignKey: 'facultyId' });
  Faculty.hasOne(FacultyAdmin, { foreignKey: 'facultyId' });
};
