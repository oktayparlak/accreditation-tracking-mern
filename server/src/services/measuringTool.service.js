const Course = require('../models/course.model');
const MeasuringTool = require('../models/measuringTool.model');

const excludeColums = ['createdAt', 'updatedAt'];

class MeasuringToolService {
  async createMeasuringTool(data) {
    const measuringTool = MeasuringTool.build(data, { include: [Course] });
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

  deleteMeasuringTool(id) {
    MeasuringTool.destroy({ where: { id } })
      .then(() => {
        return true;
      })
      .catch((error) => {
        throw error;
      });
  }
}

module.exports = new MeasuringToolService();
