const CourseAdminService = require('../services/courseAdmin.service');

const AppError = require('../utilities/AppError');

/** Create */
exports.create = async (req, res, next) => {
  try {
    const courseAdmin = await CourseAdminService.createCourseAdmin(req.body);
    res.status(201).json(courseAdmin);
  } catch (error) {
    throw new AppError(error.message, 500);
  }
};

/** Read */
exports.getAll = async (req, res, next) => {
  try {
    const courseAdmins = await CourseAdminService.findAllCourseAdmins();
    res.status(200).json(courseAdmins);
  } catch (error) {
    throw new AppError(error.message, 500);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const courseAdmin = await CourseAdminService.findCourseAdminById(
      req.params.id
    );
    if (!courseAdmin) {
      return res.status(404).json({
        error: { message: 'CourseAdmin not found' },
      });
    }
    res.status(200).json(courseAdmin);
  } catch (error) {
    throw new AppError(error.message, 500);
  }
};

exports.getByUserId = async (req, res, next) => {
  try {
    const courseAdmin = await CourseAdminService.findCourseAdminsByUserId(
      req.params.id
    );
    if (!courseAdmin) {
      return res.status(404).json({
        error: { message: 'CourseAdmin not found' },
      });
    }
    res.status(200).json(courseAdmin);
  } catch (error) {
    throw new AppError(error.message, 500);
  }
};

exports.getByCourseId = async (req, res, next) => {
  try {
    const courseAdmins = await CourseAdminService.findCourseAdminsByCourseId(
      req.params.id
    );
    if (!courseAdmins) {
      return res.status(404).json({
        error: { message: 'CourseAdmin not found' },
      });
    }
    res.status(200).json(courseAdmins);
  } catch (error) {
    throw new AppError(error.message, 500);
  }
};

/** Update */
exports.update = async (req, res, next) => {};

/** Delete */
exports.delete = async (req, res, next) => {};
