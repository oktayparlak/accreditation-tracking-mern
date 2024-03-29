const Faculty = require('../models/faculty.model');

const excludeColums = ['createdAt', 'updatedAt'];

class FacultyService {
  async createFaculty(data) {
    const faculty = Faculty.build(data);
    await faculty.save();
    excludeColums.forEach((column) => {
      faculty[column] = undefined;
    });
    return faculty;
  }

  async findFacultyById(id) {
    return await Faculty.findOne({
      where: { id },
      attributes: { exclude: excludeColums },
    });
  }

  async findAllFaculties() {
    return await Faculty.findAll({
      attributes: { exclude: excludeColums },
    });
  }

  async updateFaculty(id, data) {
    const faculty = await Faculty.update(data, { where: { id } });
    excludeColums.forEach((column) => {
      faculty[column] = undefined;
    });
    return faculty;
  }

  async deleteFaculty(id) {
    await Faculty.destroy({ where: { id } })
      .then(() => {
        return true;
      })
      .catch((error) => {
        throw error;
      });
  }
}

module.exports = new FacultyService();
