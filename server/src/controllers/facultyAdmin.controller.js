const FacultyAdminService = require('../services/facultyAdmin.service');

const AppError = require('../utilities/AppError');

/** Create */
exports.create = async (req, res, next) => {
  try {
    const facultyAdmin = await FacultyAdminService.createFacultyAdmin(req.body);
    res.status(201).json(facultyAdmin);
  } catch (error) {
    next(error);
  }
};

/** Read */
exports.getAll = async (req, res, next) => {
  try {
    const facultyAdmins = await FacultyAdminService.findAllFacultyAdmins();
    if (!facultyAdmins || facultyAdmins.length === 0)
      return res.status(404).json({ error: { message: 'Faculty Admins not found' } });
    return res.status(200).json(facultyAdmins);
  } catch (error) {
    next(error);
  }
};

exports.getAllWithRole = async (req, res, next) => {
  try {
    const facultyAdmins = await FacultyAdminService.findAllFacultyAdminsWithRole();
    if (!facultyAdmins || facultyAdmins.length === 0)
      return res.status(404).json({ error: { message: 'Faculty Admins not found' } });
    return res.status(200).json(facultyAdmins);
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const facultyAdmin = await FacultyAdminService.findFacultyAdminById(req.params.id);
    if (!facultyAdmin) throw new AppError(404, 'Faculty Admin not found');
    return res.status(200).json(facultyAdmin);
  } catch (error) {
    next(error);
  }
};

/** Update */
exports.update = async (req, res, next) => {
  try {
    const facultyAdmin = await FacultyAdminService.updateFacultyAdmin(req.params.id, req.body);
    if (!facultyAdmin)
      return res.status(404).json({ error: { message: 'Faculty Admin not found' } });
    return res.status(200).json(facultyAdmin);
  } catch (error) {
    next(error);
  }
};

/** Delete */
exports.delete = (req, res, next) => {
  try {
    const facultyAdmin = FacultyAdminService.deleteFacultyAdmin(req.params.id);
    if (!facultyAdmin) throw new AppError(401, 'Error! Faculty Admin not deleted');
    return res.status(200).json(facultyAdmin);
  } catch (error) {
    next(error);
  }
};
