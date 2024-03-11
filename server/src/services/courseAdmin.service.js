const Course = require('../models/course.model');
const User = require('../models/user.model');
const CourseAdmin = require('../models/courseAdmin.model');

const AppError = require('../utilities/AppError');
const excludeColums = ['isDeleted', 'createdAt', 'updatedAt', 'password'];

class CourseAdminService {
  async createCourseAdmin({ userId, courseId }) {
    const user = await User.findOne({
      where: { id: userId, isDeleted: false },
    });
    if (!user) throw new AppError('User not found', 404);
    const course = await Course.findOne({
      where: { id: courseId, isDeleted: false },
    });
    if (!course) throw new AppError('Course not found', 404);
    return await CourseAdmin.create({ userId, courseId });
  }

  async findCourseAdminById(id) {
    return await CourseAdmin.findOne({
      where: { id, isDeleted: false },
      attributes: { exclude: excludeColums },
      include: [
        { model: User, attributes: { exclude: excludeColums } },
        { model: Course, attributes: { exclude: excludeColums } },
      ],
    });
  }

  async findCourseAdminsByUserId(userId) {
    return await CourseAdmin.findOne({
      where: { userId, isDeleted: false },
      attributes: { exclude: excludeColums },
      include: [
        { model: User, attributes: { exclude: excludeColums } },
        { model: Course, attributes: { exclude: excludeColums } },
      ],
    });
  }

  async findCourseAdminsByCourseId(courseId) {
    return await CourseAdmin.findOne({
      where: { courseId, isDeleted: false },
      attributes: { exclude: excludeColums },
      include: [
        { model: User, attributes: { exclude: excludeColums } },
        { model: Course, attributes: { exclude: excludeColums } },
      ],
    });
  }

  async findAllCourseAdmins() {
    return await CourseAdmin.findAll({
      where: { isDeleted: false },
      attributes: { exclude: excludeColums },
      include: [
        { model: User, attributes: { exclude: excludeColums } },
        { model: Course, attributes: { exclude: excludeColums } },
      ],
    });
  }

  async updateCourseAdmin(id, userId, courseId) {}

  async deleteCourseAdmin(id) {}
}

module.exports = new CourseAdminService();
