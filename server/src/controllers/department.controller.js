const DepartmentService = require('../services/department.service');

const AppError = require('../utilities/AppError');

/** Create */
exports.create = async (req, res, next) => {
  try {
    const department = await DepartmentService.createDepartment(req.body);
    res.status(201).json(department);
  } catch (error) {
    throw new AppError(error.message, 500);
  }
};

/** Read */
exports.getAll = async (req, res, next) => {
  try {
    const departments = await DepartmentService.findAllDepartments();
    if (!departments || departments.length === 0)
      return res.status(404).json({ message: 'Departments not found' });
    res.status(200).json(departments);
  } catch (error) {
    throw new AppError(error.message, 500);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const department = await DepartmentService.findDepartmentById(
      req.params.id
    );
    if (!department)
      return res.status(404).json({ message: 'Department not found' });
    res.status(200).json(department);
  } catch (error) {
    throw new AppError(error.message, 500);
  }
};

/** Update */
exports.update = async (req, res, next) => {
  try {
    const department = await DepartmentService.updateDepartment(
      req.params.id,
      req.body
    );
    res.status(200).json(department);
  } catch (error) {
    throw new AppError(error.message, 500);
  }
};

/** Delete */
exports.delete = (req, res, next) => {
  try {
    const department = DepartmentService.deleteDepartment(req.params.id);
    res.status(200).json(department);
  } catch (error) {
    throw new AppError(error.message, 500);
  }
};
