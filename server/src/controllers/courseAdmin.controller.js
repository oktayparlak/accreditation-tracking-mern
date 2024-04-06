const CourseAdminService = require('../services/courseAdmin.service');

/** Create */
exports.create = async (req, res, next) => {
  try {
    const courseAdmin = await CourseAdminService.createCourseAdmin(req.body);
    res.status(201).json(courseAdmin);
  } catch (error) {
    next(error);
  }
};

/** Read */
exports.getAll = async (req, res, next) => {
  try {
    const courseAdmins = await CourseAdminService.findAllCourseAdmins();
    res.status(200).json(courseAdmins);
  } catch (error) {
    next(error);
  }
};

exports.getAllWithRole = async (req, res, next) => {
  try {
    const courseAdmins = await CourseAdminService.findAllCourseAdminsWithRole();
    return res.status(200).json(courseAdmins);
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const courseAdmin = await CourseAdminService.findCourseAdminById(req.params.id);
    if (!courseAdmin) {
      return res.status(404).json({
        error: { message: 'CourseAdmin not found' },
      });
    }
    res.status(200).json(courseAdmin);
  } catch (error) {
    next(error);
  }
};

exports.getByUserId = async (req, res, next) => {
  try {
    const courseAdmin = await CourseAdminService.findCourseAdminsByUserId(req.params.userId);
    if (!courseAdmin) {
      return res.status(404).json({
        error: { message: 'CourseAdmin not found' },
      });
    }
    res.status(200).json(courseAdmin);
  } catch (error) {
    next(error);
  }
};

exports.getByCourseId = async (req, res, next) => {
  try {
    const courseAdmins = await CourseAdminService.findCourseAdminsByCourseId(req.params.courseId);
    if (!courseAdmins) {
      return res.status(404).json({
        error: { message: 'CourseAdmin not found' },
      });
    }
    res.status(200).json(courseAdmins);
  } catch (error) {
    next(error);
  }
};

/** Update */
exports.update = async (req, res, next) => {};

/** Delete */
exports.delete = async (req, res, next) => {
  try {
    const courseAdmin = CourseAdminService.deleteCourseAdmin(req.params.id);
    return res.status(200).json(courseAdmin);
  } catch (error) {
    next(error);
  }
};
