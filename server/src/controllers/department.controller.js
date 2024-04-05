const DepartmentService = require('../services/department.service');

/** Create */
exports.create = async (req, res, next) => {
  try {
    const department = await DepartmentService.createDepartment(req.body);
    res.status(201).json(department);
  } catch (error) {
    next(error);
  }
};

/** Read */
exports.getAll = async (req, res, next) => {
  try {
    const departments = await DepartmentService.findAllDepartments();
    res.status(200).json(departments);
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const department = await DepartmentService.findDepartmentById(req.params.id);
    if (!department) return res.status(404).json({ message: 'Department not found' });
    res.status(200).json(department);
  } catch (error) {
    next(error);
  }
};

/** Update */
exports.update = async (req, res, next) => {
  try {
    const department = await DepartmentService.updateDepartment(req.params.id, req.body);
    res.status(200).json(department);
  } catch (error) {
    next(error);
  }
};

/** Delete */
exports.delete = (req, res, next) => {
  try {
    const department = DepartmentService.deleteDepartment(req.params.id);
    res.status(200).json(department);
  } catch (error) {
    next(error);
  }
};
