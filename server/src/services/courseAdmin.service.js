const Course = require('../models/course.model');
const User = require('../models/user.model');
const CourseAdmin = require('../models/courseAdmin.model');

const excludeColums = ['isDeleted', 'createdAt', 'updatedAt'];

class CourseAdminService {
  async createCourseAdmin(userId, courseId) {
    const user = await User.findOne({
      where: { id: userId, isDeleted: false },
    });
    if (!user) throw new Error('User not found');
    const course = await Course.findOne({
      where: { id: courseId, isDeleted: false },
    });
    if (!course) throw new Error('Course not found');
    return await CourseAdmin.create({ userId, courseId });
  }

  async findCourseAdminById(id) {
    return await CourseAdmin.findOne({
      where: { id, isDeleted: false },
      include: [
        { model: User, attributes: { exclude: excludeColums } },
        { model: Course, attributes: { exclude: excludeColums } },
      ],
    });
  }

  async findCourseAdminsByUserId(userId) {
    return await CourseAdmin.findOne({
      where: { userId, isDeleted: false },
      include: [
        { model: User, attributes: { exclude: excludeColums } },
        { model: Course, attributes: { exclude: excludeColums } },
      ],
    });
  }

  async findCourseAdminsByCourseId(courseId) {
    return await CourseAdmin.findOne({
      where: { courseId, isDeleted: false },
      include: [
        { model: User, attributes: { exclude: excludeColums } },
        { model: Course, attributes: { exclude: excludeColums } },
      ],
    });
  }

  async findAllCourseAdmins() {
    return await CourseAdmin.findAll({
      where: { isDeleted: false },
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
