const DepartmentAdminService = require('../services/departmentAdmin.service');

/** Create */
exports.create = async (req, res, next) => {
  try {
    const departmentAdmin = await DepartmentAdminService.createDepartmentAdmin(req.body);
    res.status(201).json(departmentAdmin);
  } catch (error) {
    next(error);
  }
};

/** Read */
exports.getAll = async (req, res, next) => {
  try {
    const departmentAdmins = await DepartmentAdminService.findAllDepartmentAdmins();
    res.status(200).json(departmentAdmins);
  } catch (error) {
    next(error);
  }
};

exports.getAllWithRole = async (req, res, next) => {
  try {
    const departmentAdmins = await DepartmentAdminService.findAllDepartmentAdminsWithRole();
    return res.status(200).json(departmentAdmins);
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const departmentAdmin = await DepartmentAdminService.findDepartmentAdminById(req.params.id);
    if (!departmentAdmin) {
      return res.status(404).json({
        error: { message: 'DepartmentAdmin not found' },
      });
    }
    res.status(200).json(departmentAdmin);
  } catch (error) {
    next(error);
  }
};

exports.getByUserId = async (req, res, next) => {
  try {
    const departmentAdmin = await DepartmentAdminService.findDepartmentAdminsByUserId(
      req.params.userId
    );
    if (!departmentAdmin) {
      return res.status(404).json({
        error: { message: 'DepartmentAdmin not found' },
      });
    }
    res.status(200).json(departmentAdmin);
  } catch (error) {
    next(error);
  }
};

exports.getByDepartmentId = async (req, res, next) => {
  try {
    const departmentAdmins = await DepartmentAdminService.findDepartmentAdminsByDepartmentId(
      req.params.departmentId
    );
    res.status(200).json(departmentAdmins);
  } catch (error) {
    next(error);
  }
};

/** Update */
exports.update = async (req, res, next) => {};

/** Delete */
exports.delete = async (req, res, next) => {
  try {
    const departmentAdmin = DepartmentAdminService.deleteDepartmentAdmin(req.params.id);
    if (!departmentAdmin) throw new AppError(401, 'Error! Department Admin not deleted');
    return res.status(200).json(departmentAdmin);
  } catch (error) {
    next(error);
  }
};
