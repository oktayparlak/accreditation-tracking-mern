const Department = require('../models/department.model');
const User = require('../models/user.model');
const DepartmentAdmin = require('../models/departmentAdmin.model');

const excludeColums = ['isDeleted', 'createdAt', 'updatedAt'];

class DepartmentAdminService {
  async createDepartmentAdmin({ userId, departmentId }) {
    const user = await User.findOne({
      where: { id: userId, isDeleted: false },
    });
    if (!user) throw new Error('User not found');
    const department = await Department.findOne({
      where: { id: departmentId, isDeleted: false },
    });
    if (!department) throw new Error('Department not found');
    return await DepartmentAdmin.create({ userId, departmentId });
  }

  async findDepartmentAdminById(id) {
    return await DepartmentAdmin.findOne({
      where: { id, isDeleted: false },
      include: [
        { model: User, attributes: { exclude: excludeColums } },
        { model: Department, attributes: { exclude: excludeColums } },
      ],
    });
  }

  async findDepartmentAdminsByUserId(userId) {
    return await DepartmentAdmin.findOne({
      where: { userId, isDeleted: false },
      include: [
        { model: User, attributes: { exclude: excludeColums } },
        { model: Department, attributes: { exclude: excludeColums } },
      ],
    });
  }

  async findDepartmentAdminsByDepartmentId(departmentId) {
    return await DepartmentAdmin.findOne({
      where: { departmentId, isDeleted: false },
      include: [
        { model: User, attributes: { exclude: excludeColums } },
        { model: Department, attributes: { exclude: excludeColums } },
      ],
    });
  }

  async findAllDepartmentAdmins() {
    return await DepartmentAdmin.findAll({
      where: { isDeleted: false },
      include: [
        { model: User, attributes: { exclude: excludeColums } },
        { model: Department, attributes: { exclude: excludeColums } },
      ],
    });
  }

  async updateDepartmentAdmin(id, userId, departmentId) {}

  async deleteDepartmentAdmin(id) {}
}

module.exports = new DepartmentAdminService();
