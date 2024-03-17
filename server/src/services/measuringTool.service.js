const MeasuringTool = require('../models/measuringTool.model');

const excludeColums = ['isDeleted', 'createdAt', 'updatedAt'];

class MeasuringToolService {
  async createMeasuringTool(data) {
    const measuringTool = MeasuringTool.build(data);
    await measuringTool.save();
    excludeColums.forEach((column) => {
      measuringTool[column] = undefined;
    });
    return measuringTool;
  }

  async getMeasuringTools() {
    const measuringTools = await MeasuringTool.findAll({
      where: { isDeleted: false },
      attributes: { exclude: excludeColums },
    });
    return measuringTools;
  }

  async getMeasuringToolById(id) {
    const measuringTool = await MeasuringTool.findOne({
      where: { id, isDeleted: false },
      attributes: { exclude: excludeColums },
    });
    return measuringTool;
  }

  async updateMeasuringTool(id, data) {
    const measuringTool = await MeasuringTool.findOne({
      where: { id, isDeleted: false },
    });
    measuringTool.update(data);
    excludeColums.forEach((column) => {
      measuringTool[column] = undefined;
    });
    return measuringTool;
  }

  deleteMeasuringTool(id) {
    MeasuringTool.update({ where: { id } }, { isDeleted: true })
      .then(() => {
        return true;
      })
      .catch((error) => {
        throw error;
      });
  }
}

module.exports = new MeasuringToolService();
