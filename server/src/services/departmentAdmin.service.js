const Department = require('../models/department.model');
const User = require('../models/user.model');
const DepartmentAdmin = require('../models/departmentAdmin.model');

const AppError = require('../utilities/AppError');
const excludeColums = ['createdAt', 'updatedAt', 'password'];

class DepartmentAdminService {
  async createDepartmentAdmin({ userId, departmentId }) {
    const user = await User.findOne({
      where: { id: userId },
    });
    if (!user) throw new AppError('User not found', 404);
    const department = await Department.findOne({
      where: { id: departmentId },
    });
    if (!department) throw new AppError('Department not found', 404);
    return await DepartmentAdmin.create({ userId, departmentId });
  }

  async findDepartmentAdminById(id) {
    return await DepartmentAdmin.findOne({
      where: { id },
      attributes: { exclude: excludeColums },
      include: [
        { model: User, attributes: { exclude: excludeColums } },
        { model: Department, attributes: { exclude: excludeColums } },
      ],
    });
  }

  async findDepartmentAdminsByUserId(userId) {
    return await DepartmentAdmin.findOne({
      where: { userId },
      attributes: { exclude: excludeColums },
      include: [
        { model: User, attributes: { exclude: excludeColums } },
        { model: Department, attributes: { exclude: excludeColums } },
      ],
    });
  }

  async findDepartmentAdminsByDepartmentId(departmentId) {
    return await DepartmentAdmin.findOne({
      where: { departmentId },
      attributes: { exclude: excludeColums },
      include: [
        { model: User, attributes: { exclude: excludeColums } },
        { model: Department, attributes: { exclude: excludeColums } },
      ],
    });
  }

  async findAllDepartmentAdmins() {
    return await DepartmentAdmin.findAll({
      attributes: { exclude: excludeColums },
      include: [
        { model: User, attributes: { exclude: excludeColums } },
        { model: Department, attributes: { exclude: excludeColums } },
      ],
    });
  }

  async findAllDepartmentAdminsWithRole() {
    const departmentAdmins = await DepartmentAdmin.findAll({
      include: [
        {
          model: User,
          attributes: { exclude: excludeColums },
          where: { role: 'DEPARTMENT_ADMIN' },
        },
        {
          model: Department,
          attributes: { exclude: excludeColums },
        },
      ],
    });
    return departmentAdmins;
  }

  async updateDepartmentAdmin(id, userId, departmentId) {}

  async deleteDepartmentAdmin(id) {
    await DepartmentAdmin.destroy({ where: { id } })
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }
}

module.exports = new DepartmentAdminService();
