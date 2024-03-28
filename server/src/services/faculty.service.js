const Faculty = require('../models/faculty.model');

const excludeColums = ['isDeleted', 'createdAt', 'updatedAt'];

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
      where: { id, isDeleted: false },
      attributes: { exclude: excludeColums },
    });
  }

  async findAllFaculties() {
    return await Faculty.findAll({
      where: { isDeleted: false },
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
    const faculty = await Faculty.findOne({ where: { id } });
    faculty.isDeleted = true;
    await faculty.save();
    return faculty;
  }
}

module.exports = new FacultyService();
