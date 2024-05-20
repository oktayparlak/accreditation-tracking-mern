const Application = require('./application.model');
const Course = require('./course.model');
const CourseAdmin = require('./courseAdmin.model');
const CourseSupervisor = require('./courseSupervisor.model');
const Department = require('./department.model');
const DepartmentAdmin = require('./departmentAdmin.model');
const DepartmentMaterial = require('./departmentMaterial.model');
const Faculty = require('./faculty.model');
const FacultyAdmin = require('./facultyAdmin.model');
const File = require('./file.model');
const LearningMaterial = require('./learningMaterial.model');
const MeasuringTool = require('./measuringTool.model');
const Question = require('./question.model');
const QuestionLearningMaterial = require('./questionLearningMaterial.model');
const User = require('./user.model');

module.exports = () => {
  CourseAdmin.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
  CourseAdmin.belongsTo(Course, { foreignKey: 'courseId', onDelete: 'CASCADE' });

  DepartmentAdmin.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
  DepartmentAdmin.belongsTo(Department, { foreignKey: 'departmentId', onDelete: 'CASCADE' });

  User.hasOne(CourseAdmin, { foreignKey: 'userId', onDelete: 'CASCADE' });
  User.hasOne(DepartmentAdmin, { foreignKey: 'userId', onDelete: 'CASCADE' });

  Course.hasOne(CourseAdmin, { foreignKey: 'courseId', onDelete: 'CASCADE' });
  Department.hasOne(DepartmentAdmin, { foreignKey: 'departmentId', onDelete: 'CASCADE' });

  LearningMaterial.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
  User.hasMany(LearningMaterial, { foreignKey: 'userId', onDelete: 'CASCADE' });

  Application.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
  User.hasMany(Application, { foreignKey: 'userId', onDelete: 'CASCADE' });

  Application.belongsTo(Course, { foreignKey: 'courseId', onDelete: 'CASCADE' });
  Course.hasMany(Application, { foreignKey: 'courseId', onDelete: 'CASCADE' });

  File.belongsTo(Application, { foreignKey: 'applicationId', onDelete: 'CASCADE' });
  Application.hasMany(File, { foreignKey: 'applicationId', onDelete: 'CASCADE' });

  Question.belongsTo(MeasuringTool, { foreignKey: 'measuringToolId', onDelete: 'CASCADE' });
  MeasuringTool.hasMany(Question, { foreignKey: 'measuringToolId', onDelete: 'CASCADE' });

  QuestionLearningMaterial.belongsTo(Question, { foreignKey: 'questionId', onDelete: 'CASCADE' });
  Question.hasMany(QuestionLearningMaterial, { foreignKey: 'questionId', onDelete: 'CASCADE' });

  QuestionLearningMaterial.belongsTo(LearningMaterial, {
    foreignKey: 'learningMaterialId',
    onDelete: 'CASCADE',
  });
  LearningMaterial.hasMany(QuestionLearningMaterial, {
    foreignKey: 'learningMaterialId',
    onDelete: 'CASCADE',
  });

  FacultyAdmin.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
  User.hasOne(FacultyAdmin, { foreignKey: 'userId', onDelete: 'CASCADE' });

  FacultyAdmin.belongsTo(Faculty, { foreignKey: 'facultyId', onDelete: 'CASCADE' });
  Faculty.hasOne(FacultyAdmin, { foreignKey: 'facultyId', onDelete: 'CASCADE' });

  Department.belongsTo(Faculty, { foreignKey: 'facultyId', onDelete: 'CASCADE' });
  Faculty.hasMany(Department, { foreignKey: 'facultyId', onDelete: 'CASCADE' });

  Course.belongsTo(Department, { foreignKey: 'departmentId', onDelete: 'CASCADE' });
  Department.hasMany(Course, { foreignKey: 'departmentId', onDelete: 'CASCADE' });

  LearningMaterial.belongsTo(Course, { foreignKey: 'courseId', onDelete: 'CASCADE' });
  Course.hasMany(LearningMaterial, { foreignKey: 'courseId', onDelete: 'CASCADE' });

  CourseSupervisor.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
  User.hasOne(CourseSupervisor, { foreignKey: 'userId', onDelete: 'CASCADE' });

  CourseSupervisor.belongsTo(Course, { foreignKey: 'courseId', onDelete: 'CASCADE' });
  Course.hasOne(CourseSupervisor, { foreignKey: 'courseId', onDelete: 'CASCADE' });

  MeasuringTool.belongsTo(Course, { foreignKey: 'courseId', onDelete: 'CASCADE' });
  Course.hasMany(MeasuringTool, { foreignKey: 'courseId', onDelete: 'CASCADE' });

  DepartmentMaterial.belongsTo(Department, { foreignKey: 'departmentId', onDelete: 'CASCADE' });
  Department.hasMany(DepartmentMaterial, { foreignKey: 'departmentId', onDelete: 'CASCADE' });
};
