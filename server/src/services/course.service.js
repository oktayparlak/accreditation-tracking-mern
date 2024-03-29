const Course = require('../models/course.model');

const excludeColums = ['createdAt', 'updatedAt'];

class CourseService {
  async createCourse(data) {
    const course = Course.build(data);
    await course.save();
    excludeColums.forEach((column) => {
      course[column] = undefined;
    });
    return course;
  }

  async findCourseById(id) {
    return await Course.findOne({
      where: { id },
      attributes: { exclude: excludeColums },
    });
  }

  async findAllCourses() {
    return await Course.findAll({
      attributes: { exclude: excludeColums },
    });
  }

  async updateCourse(id, data) {
    const course = await Course.update({ where: { id } }, data);
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
