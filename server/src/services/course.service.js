const Course = require('../models/course.model');

const excludeColums = ['isDeleted', 'createdAt', 'updatedAt'];

class CourseService {
  async createCourse(data) {
    const course = await Course.create(data);
    excludeColums.map((column) => {
      course[column] = undefined;
    });
    return course;
  }

  async findCourseById(id) {
    return await Course.findOne({ where: { id, isDeleted: false } }, { attributes: { exclude: excludeColums } });
  }

  async findAllCourses() {
    return await Course.findAll({ where: { isDeleted: false } }, { attributes: { exclude: excludeColums } });
  }

  async updateCourse(id, data) {
    const course = await Course.update({ where: { id } }, data);
    excludeColums.map((column) => {
      course[column] = undefined;
    });
    return course;
  }

  deleteCourse(id) {
    Course.update({ where: { id } }, { isDeleted: true })
      .then(() => {
        return true;
      })
      .catch((error) => {
        throw error;
      });
  }
}

module.exports = new CourseService();
