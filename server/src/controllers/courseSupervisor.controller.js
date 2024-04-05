const CourseSupervisorService = require('../services/courseSupervisor.service');

/** Create */
exports.create = async (req, res, next) => {
  try {
    const courseSupervisor = await CourseSupervisorService.createCourseSupervisor(req.body);
    res.status(201).json(courseSupervisor);
  } catch (error) {
    next(error);
  }
};

/** Read */
exports.getAll = async (req, res, next) => {
  try {
    const courseSupervisors = await CourseSupervisorService.findAllCourseSupervisors();
    res.status(200).json(courseSupervisors);
  } catch (error) {
    next(error);
  }
};

exports.getAllWithRole = async (req, res, next) => {
  try {
    const courseSupervisors = await CourseSupervisorService.findAllCourseSupervisorWithRole();
    return res.status(200).json(courseSupervisors);
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const courseSupervisor = await CourseSupervisorService.findCourseSupervisorById(req.params.id);
    if (!courseSupervisor) {
      return res.status(404).json({
        error: { message: 'CourseSupervisor not found' },
      });
    }
    res.status(200).json(courseSupervisor);
  } catch (error) {
    next(error);
  }
};

exports.getByUserId = async (req, res, next) => {};

exports.getByCourseId = async (req, res, next) => {};

/** Update */
exports.update = async (req, res, next) => {};

/** Delete */
exports.delete = async (req, res, next) => {
  try {
    const courseSupervisor = await CourseSupervisorService.deleteCourseSupervisor(req.params.id);
    if (!courseSupervisor) {
      return res.status(404).json({
        error: { message: 'CourseSupervisor not found' },
      });
    }
    res.status(200).json(courseSupervisor);
  } catch (error) {
    next(error);
  }
};
