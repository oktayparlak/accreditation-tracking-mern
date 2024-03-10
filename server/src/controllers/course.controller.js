const CourseService = require('../services/course.service');

const AppError = require('../utilities/AppError');

/** Create */
exports.create = async (req, res, next) => {
  try {
    const course = await CourseService.createCourse(req.body);
    res.status(201).json(course);
  } catch (error) {
    throw new AppError(error.message, 500);
  }
};

/** Read */
exports.getAll = async (req, res, next) => {
  try {
    const courses = await CourseService.findAllCourses();
    if (!courses || courses.length === 0)
      return res.status(404).json({ error: { message: 'Courses not found' } });
    return res.status(200).json(courses);
  } catch (error) {
    throw new AppError(error.message, 500);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const course = await CourseService.findCourseById(req.params.id);
    if (!course)
      return res.status(404).json({ error: { message: 'Course not found' } });
    return res.status(200).json(course);
  } catch (error) {
    throw new AppError(error.message, 500);
  }
};

/** Update */
exports.update = async (req, res, next) => {
  try {
    const course = await CourseService.updateCourse(req.params.id, req.body);
    if (!course)
      return res.status(404).json({ error: { message: 'Course not found' } });
    return res.status(200).json(course);
  } catch (error) {
    throw new AppError(error.message, 500);
  }
};

/** Delete */
exports.delete = (req, res, next) => {
  try {
    const course = CourseService.deleteCourse(req.params.id);
    if (!course)
      return res.status(404).json({ error: { message: 'Course not found' } });
    return res.status(200).json(course);
  } catch (error) {
    throw new AppError(error.message, 500);
  }
};
