const CourseSupervisor = require('../models/courseSupervisor.model');
const User = require('../models/user.model');
const Course = require('../models/course.model');

const AppError = require('../utilities/AppError');
const excludeColums = ['createdAt', 'updatedAt', 'password'];

class CourseSupervisorService {
  async createCourseSupervisor({ userId, courseId }) {
    const user = await User.findOne({
      where: { id: userId },
    });
    if (!user) throw new AppError('User not found', 404);
    const course = await Course.findOne({
      where: { id: courseId },
    });
    if (!course) throw new AppError('Department not found', 404);
    return await CourseSupervisor.create({ userId, courseId });
  }

  async findCourseSupervisorById(id) {
    return await CourseSupervisor.findOne({
      where: { id },
      attributes: { exclude: excludeColums },
      include: [
        { model: User, attributes: { exclude: excludeColums } },
        { model: Course, attributes: { exclude: excludeColums } },
      ],
    });
  }

  async findAllCourseSupervisorsByUserId(userId) {
    const courseSupervisorUserCourse = await CourseSupervisor.findAll({
      where: { userId },
      attributes: { exclude: excludeColums },
      include: [
        { model: User, attributes: { exclude: excludeColums } },
        { model: Course, attributes: { exclude: excludeColums } },
      ],
    });
    return courseSupervisorUserCourse;
  }

  async findCourseSupervisorsByCourseId(courseId) {
    return await CourseSupervisor.findOne({
      where: { courseId },
      attributes: { exclude: excludeColums },
      include: [
        { model: User, attributes: { exclude: excludeColums } },
        { model: Course, attributes: { exclude: excludeColums } },
      ],
    });
  }

  async findAllCourseSupervisors() {
    return await CourseSupervisor.findAll({
      attributes: { exclude: excludeColums },
      include: [
        { model: User, attributes: { exclude: excludeColums } },
        { model: Course, attributes: { exclude: excludeColums } },
      ],
    });
  }

  async findAllCourseSupervisorWithRole() {
    const courseSupervisors = await CourseSupervisor.findAll({
      include: [
        {
          model: User,
          attributes: { exclude: excludeColums },
          where: { role: 'COURSE_SUPERVISOR' },
        },
        {
          model: Course,
          attributes: { exclude: excludeColums },
        },
      ],
    });
    return courseSupervisors;
  }

  async updateCourseSupervisor(id, userId, courseId) {}

  async deleteCourseSupervisor(id) {
    const courseSupervisor = await CourseSupervisor.findOne({ where: { id } });
    if (!courseSupervisor) throw new AppError('Course Supervisor not found', 404);
    await courseSupervisor.destroy();
    return courseSupervisor;
  }
}

module.exports = new CourseSupervisorService();
