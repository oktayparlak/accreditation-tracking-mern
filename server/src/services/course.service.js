const Course = require('../models/course.model');
const Department = require('../models/department.model');
const MeasuringTool = require('../models/measuringTool.model');

const excludeColums = ['createdAt', 'updatedAt'];

class CourseService {
  async createCourse(data) {
    const course = Course.build(data);
    await course.save();
    await MeasuringTool.bulkCreate([
      { courseId: course.id, name: 'Vize', impactRate: 0.4 },
      { courseId: course.id, name: 'Final', impactRate: 0.6 },
    ]);
    excludeColums.forEach((column) => {
      course[column] = undefined;
    });
    return course;
  }

  async findCourseById(id) {
    return await Course.findOne({
      where: { id },
      include: [Department],
      attributes: { exclude: excludeColums },
    });
  }

  async findAllCourses() {
    return await Course.findAll({
      attributes: { exclude: excludeColums },
      include: [Department],
    });
  }

  async updateCourse(id, data) {
    const course = await Course.update(data, { where: { id } });
    excludeColums.forEach((column) => {
      course[column] = undefined;
    });
    return course;
  }

  deleteCourse(id) {
    Course.destroy({ where: { id } })
      .then(() => {
        return true;
      })
      .catch((error) => {
        throw error;
      });
  }
}

module.exports = new CourseService();
