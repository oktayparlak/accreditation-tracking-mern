const DepartmentMaterialService = require('../services/departmentMaterial.service');

/** Create */
exports.create = async (req, res, next) => {
  try {
    const departmentMaterial = await DepartmentMaterialService.createDepartmentMaterial(req.body);
    res.status(201).json(departmentMaterial);
  } catch (error) {
    next(error);
  }
};

/** Read */
exports.getAll = async (req, res, next) => {
  try {
    const departmentMaterials = await DepartmentMaterialService.findAllDepartmentMaterials();
    res.status(200).json(departmentMaterials);
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const departmentMaterial = await DepartmentMaterialService.findDepartmentMaterialById(
      req.params.id
    );
    res.status(200).json(departmentMaterial);
  } catch (error) {
    next(error);
  }
};

exports.getByCourseId = async (req, res, next) => {
  try {
    const departmentMaterials = await DepartmentMaterialService.findDepartmentMaterialsByCourseId(
      req.params.courseId
    );
    res.status(200).json(departmentMaterials);
  } catch (error) {
    next(error);
  }
};

/** Update */
exports.update = async (req, res, next) => {
  try {
    const departmentMaterial = await DepartmentMaterialService.updateDepartmentMaterial(
      req.params.id,
      req.body
    );
    res.status(200).json(departmentMaterial);
  } catch (error) {
    next(error);
  }
};

/** Delete */
exports.delete = async (req, res, next) => {
  try {
    await DepartmentMaterialService.deleteDepartmentMaterial(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
