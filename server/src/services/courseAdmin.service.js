const Course = require('../models/course.model');
const User = require('../models/user.model');
const CourseAdmin = require('../models/courseAdmin.model');

const AppError = require('../utilities/AppError');
const excludeColums = ['createdAt', 'updatedAt', 'password'];

class CourseAdminService {
  async createCourseAdmin({ userId, courseId }) {
    const user = await User.findOne({
      where: { id: userId },
    });
    if (!user) throw new AppError('User not found', 404);
    const course = await Course.findOne({
      where: { id: courseId },
    });
    if (!course) throw new AppError('Course not found', 404);
    return await CourseAdmin.create({ userId, courseId });
  }

  async findCourseAdminById(id) {
    return await CourseAdmin.findOne({
      where: { id },
      attributes: { exclude: excludeColums },
      include: [
        { model: User, attributes: { exclude: excludeColums } },
        { model: Course, attributes: { exclude: excludeColums } },
      ],
    });
  }

  async findCourseAdminsByUserId(userId) {
    return await CourseAdmin.findOne({
      where: { userId },
      attributes: { exclude: excludeColums },
      include: [
        { model: User, attributes: { exclude: excludeColums } },
        { model: Course, attributes: { exclude: excludeColums } },
      ],
    });
  }

  async findCourseAdminsByCourseId(courseId) {
    return await CourseAdmin.findOne({
      where: { courseId },
      attributes: { exclude: excludeColums },
      include: [
        { model: User, attributes: { exclude: excludeColums } },
        { model: Course, attributes: { exclude: excludeColums } },
      ],
    });
  }

  async findAllCourseAdmins() {
    return await CourseAdmin.findAll({
      attributes: { exclude: excludeColums },
      include: [
        { model: User, attributes: { exclude: excludeColums } },
        { model: Course, attributes: { exclude: excludeColums } },
      ],
    });
  }

  async findAllCourseAdminsWithRole() {
    const courseAdmins = await CourseAdmin.findAll({
      include: [
        {
          model: User,
          attributes: { exclude: excludeColums },
          where: { role: 'COURSE_ADMIN' },
        },
        {
          model: Course,
          attributes: { exclude: excludeColums },
        },
      ],
    });
    return courseAdmins;
  }

  async updateCourseAdmin(id, userId, courseId) {}

  async deleteCourseAdmin(id) {
    const courseAdmin = await CourseAdmin.findOne({ where: { id } });
    if (!courseAdmin) throw new AppError('Course Admin not found', 404);
    await courseAdmin.destroy();
    return courseAdmin;
  }
}

module.exports = new CourseAdminService();
