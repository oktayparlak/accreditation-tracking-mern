const Department = require('../models/department.model');
const Faculty = require('../models/faculty.model');

const excludeColums = ['createdAt', 'updatedAt'];

class DepartmentService {
  async createDepartment(data) {
    const department = Department.build(data, { include: [Faculty] });
    console.log(department);
    await department.save();
    excludeColums.map((column) => {
      department[column] = undefined;
    });
    return department;
  }

  async findDepartmentById(id) {
    return await Department.findOne({
      where: { id },
      include: [{ model: Faculty, attributes: { exclude: excludeColums } }],
      attributes: { exclude: excludeColums },
    });
  }

  async findAllDepartments() {
    return await Department.findAll({
      include: [{ model: Faculty, attributes: { exclude: excludeColums } }],
      attributes: { exclude: excludeColums },
    });
  }

  async updateDepartment(id, data) {
    const department = await Department.update(data, { where: { id } });
    excludeColums.map((column) => {
      department[column] = undefined;
    });
    return department;
  }

  deleteDepartment(id) {
    Department.destroy({ where: { id } })
      .then(() => {
        return true;
      })
      .catch((error) => {
        throw error;
      });
  }
}

module.exports = new DepartmentService();
