const Department = require('../models/department.model');

const excludeColums = ['isDeleted', 'createdAt', 'updatedAt'];

class DepartmentService {
  async createDepartment(data) {
    const department = Department.build(data);
    await department.save();
    excludeColums.map((column) => {
      department[column] = undefined;
    });
    return department;
  }

  async findDepartmentById(id) {
    return await Department.findOne({
      where: { id, isDeleted: false },
      attributes: { exclude: excludeColums },
    });
  }

  async findAllDepartments() {
    return await Department.findAll({
      where: { isDeleted: false },
      attributes: { exclude: excludeColums },
    });
  }

  async updateDepartment(id, data) {
    const department = await Department.update({ where: { id } }, data);
    excludeColums.map((column) => {
      department[column] = undefined;
    });
    return department;
  }

  deleteDepartment(id) {
    Department.update({ where: { id } }, { isDeleted: true })
      .then(() => {
        return true;
      })
      .catch((error) => {
        throw error;
      });
  }
}

module.exports = new DepartmentService();
