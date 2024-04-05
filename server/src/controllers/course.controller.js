const CourseService = require('../services/course.service');

/** Create */
exports.create = async (req, res, next) => {
  try {
    const course = await CourseService.createCourse(req.body);
    res.status(201).json(course);
  } catch (error) {
    next(error);
  }
};

/** Read */
exports.getAll = async (req, res, next) => {
  try {
    const courses = await CourseService.findAllCourses();
    return res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const course = await CourseService.findCourseById(req.params.id);
    if (!course) return res.status(404).json({ error: { message: 'Course not found' } });
    return res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

/** Update */
exports.update = async (req, res, next) => {
  try {
    const course = await CourseService.updateCourse(req.params.id, req.body);
    if (!course) return res.status(404).json({ error: { message: 'Course not found' } });
    return res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

/** Delete */
exports.delete = (req, res, next) => {
  try {
    const course = CourseService.deleteCourse(req.params.id);
    if (!course) return res.status(404).json({ error: { message: 'Course not found' } });
    return res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};
