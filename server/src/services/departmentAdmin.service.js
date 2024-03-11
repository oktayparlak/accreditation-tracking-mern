const Department = require('../models/department.model');
const User = require('../models/user.model');
const DepartmentAdmin = require('../models/departmentAdmin.model');

const AppError = require('../utilities/AppError');
const excludeColums = ['isDeleted', 'createdAt', 'updatedAt', 'password'];

class DepartmentAdminService {
  async createDepartmentAdmin({ userId, departmentId }) {
    const user = await User.findOne({
      where: { id: userId, isDeleted: false },
    });
    if (!user) throw new AppError('User not found', 404);
    const department = await Department.findOne({
      where: { id: departmentId, isDeleted: false },
    });
    if (!department) throw new AppError('Department not found', 404);
    return await DepartmentAdmin.create({ userId, departmentId });
  }

  async findDepartmentAdminById(id) {
    return await DepartmentAdmin.findOne({
      where: { id, isDeleted: false },
      attributes: { exclude: excludeColums },
      include: [
        { model: User, attributes: { exclude: excludeColums } },
        { model: Department, attributes: { exclude: excludeColums } },
      ],
    });
  }

  async findDepartmentAdminsByUserId(userId) {
    return await DepartmentAdmin.findOne({
      where: { userId, isDeleted: false },
      attributes: { exclude: excludeColums },
      include: [
        { model: User, attributes: { exclude: excludeColums } },
        { model: Department, attributes: { exclude: excludeColums } },
      ],
    });
  }

  async findDepartmentAdminsByDepartmentId(departmentId) {
    return await DepartmentAdmin.findOne({
      where: { departmentId, isDeleted: false },
      attributes: { exclude: excludeColums },
      include: [
        { model: User, attributes: { exclude: excludeColums } },
        { model: Department, attributes: { exclude: excludeColums } },
      ],
    });
  }

  async findAllDepartmentAdmins() {
    return await DepartmentAdmin.findAll({
      where: { isDeleted: false },
      attributes: { exclude: excludeColums },
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
