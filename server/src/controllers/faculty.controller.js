const FacultyService = require('../services/faculty.service');
const AppError = require('../utilities/AppError');

/** Create */
exports.create = async (req, res, next) => {
  try {
    const faculty = await FacultyService.createFaculty(req.body);
    res.status(201).json(faculty);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError')
      return next(new AppError('Faculty already exists', 400));
    next(error);
  }
};

/** Read */
exports.getAll = async (req, res, next) => {
  try {
    const faculties = await FacultyService.findAllFaculties();
    return res.status(200).json(faculties);
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const faculty = await FacultyService.findFacultyById(req.params.id);
    if (!faculty) return res.status(404).json({ error: { message: 'Faculty not found' } });
    return res.status(200).json(faculty);
  } catch (error) {
    next(error);
  }
};

/** Update */
exports.update = async (req, res, next) => {
  try {
    const faculty = await FacultyService.updateFaculty(req.params.id, req.body);
    if (!faculty) return res.status(404).json({ error: { message: 'Faculty not found' } });
    return res.status(200).json(faculty);
  } catch (error) {
    next(error);
  }
};

/** Delete */
exports.delete = (req, res, next) => {
  try {
    const faculty = FacultyService.deleteFaculty(req.params.id);
    return res.status(200).json(faculty);
  } catch (error) {
    next(error);
  }
};
