const Course = require('../models/course.model');
const MeasuringTool = require('../models/measuringTool.model');

const AppError = require('../utilities/AppError');
const excludeColums = ['createdAt', 'updatedAt'];

class MeasuringToolService {
  async createMeasuringTool(data) {
    const measuringTool = MeasuringTool.build({ ...data, questionCount: 0 }, { include: [Course] });
    await measuringTool.save();
    excludeColums.forEach((column) => {
      measuringTool[column] = undefined;
    });
    return measuringTool;
  }

  async getMeasuringTools() {
    const measuringTools = await MeasuringTool.findAll({
      attributes: { exclude: excludeColums },
      include: [Course],
    });
    return measuringTools;
  }

  async getMeasuringToolById(id) {
    const measuringTool = await MeasuringTool.findOne({
      where: { id },
      attributes: { exclude: excludeColums },
      include: [Course],
    });
    return measuringTool;
  }

  async getAllMeasuringToolByCourseId(courseId) {
    const measuringTool = await MeasuringTool.findAll({
      where: { courseId },
      attributes: { exclude: excludeColums },
      include: [Course],
    });
    return measuringTool;
  }

  async updateMeasuringTool(id, data) {
    const measuringTool = await MeasuringTool.findOne({
      where: { id },
    });
    measuringTool.update(data);
    excludeColums.forEach((column) => {
      measuringTool[column] = undefined;
    });
    return measuringTool;
  }

  async deleteMeasuringTool(id) {
    const measuringTool = await MeasuringTool.findOne({ where: { id } });
    if (!measuringTool) throw new AppError('Measuring Tool not found', 404);
    await measuringTool.destroy();
    return measuringTool;
  }
}

module.exports = new MeasuringToolService();
