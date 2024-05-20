const DepartmentMaterial = require('../models/departmentMaterial.model');
const Department = require('../models/department.model');
const Faculty = require('../models/faculty.model');
const Course = require('../models/course.model');

const AppError = require('../utilities/AppError');
const excludeColums = ['createdAt', 'updatedAt'];

class DepartmentMaterialService {
  async createDepartmentMaterial(data) {
    const departmentMaterialCount = await DepartmentMaterial.findOne({
      where: { departmentId: data.departmentId },
      order: [['number', 'DESC']],
    });
    const departmentMaterial = DepartmentMaterial.build({
      ...data,
      number: (departmentMaterialCount ? departmentMaterialCount.number : 0) + 1,
    });
    await departmentMaterial.save();
    excludeColums.forEach((column) => {
      departmentMaterial[column] = undefined;
    });
    return departmentMaterial;
  }

  async findDepartmentMaterialById(id) {
    return await DepartmentMaterial.findOne({
      where: { id },
      attributes: { exclude: excludeColums },
      include: [
        {
          model: Department,
          attributes: { exclude: excludeColums },
          include: [{ model: Faculty, attributes: { exclude: excludeColums } }],
        },
      ],
    });
  }

  async findDepartmentMaterialsByCourseId(courseId) {
    const course = await Course.findOne({ where: { id: courseId } });
    return await DepartmentMaterial.findAll({
      where: { departmentId: course.departmentId },
      attributes: { exclude: excludeColums },
      include: [
        {
          model: Department,
          attributes: { exclude: excludeColums },
          include: [{ model: Faculty, attributes: { exclude: excludeColums } }],
        },
      ],
    });
  }

  async findAllDepartmentMaterials() {
    return await DepartmentMaterial.findAll({
      attributes: { exclude: excludeColums },
      include: [
        {
          model: Department,
          attributes: { exclude: excludeColums },
          include: [{ model: Faculty, attributes: { exclude: excludeColums } }],
        },
      ],
    });
  }

  async updateDepartmentMaterial(id, data) {
    const departmentMaterial = await DepartmentMaterial.update(
      { content: data.content, contributionLevel: data.contributionLevel },
      { where: { id } }
    );
    excludeColums.forEach((column) => {
      departmentMaterial[column] = undefined;
    });
    return departmentMaterial;
  }

  async deleteDepartmentMaterial(id) {
    const departmentMaterial = await DepartmentMaterial.destroy({ where: { id } });
    if (!departmentMaterial) {
      throw new AppError('DepartmentMaterial not found', 404);
    }
    await departmentMaterial.destroy();
    return departmentMaterial;
  }
}

module.exports = new DepartmentMaterialService();
