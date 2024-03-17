const MeasuringToolService = require('../services/measuringTool.service');

/** Create */
exports.create = async (req, res, next) => {
  try {
    const measuringTool = await MeasuringToolService.createMeasuringTool(req.body);
    res.status(201).json(measuringTool);
  } catch (error) {
    next(error);
  }
};

/** Get */
exports.getAll = async (req, res, next) => {
  try {
    const measuringTools = await MeasuringToolService.getMeasuringTools();
    if (!measuringTools || measuringTools.length === 0)
      return res.status(404).json({ error: { message: 'No measuring tools found' } });
    res.status(200).json(measuringTools);
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const measuringTool = await MeasuringToolService.getMeasuringToolById(req.params.id);
    if (!measuringTool)
      return res.status(404).json({ error: { message: 'Measuring tool not found' } });
    res.status(200).json(measuringTool);
  } catch (error) {
    next(error);
  }
};

/** Update */
exports.update = async (req, res, next) => {
  try {
    const measuringTool = await MeasuringToolService.updateMeasuringTool(req.params.id, req.body);
    res.status(200).json(measuringTool);
  } catch (error) {
    next(error);
  }
};

/** Delete */
exports.delete = async (req, res, next) => {
  try {
    const deleted = await MeasuringToolService.deleteMeasuringTool(req.params.id);
    if (!deleted) return res.status(404).json({ error: { message: 'Measuring tool not found' } });
    res.status(200).json({ message: 'Measuring tool deleted' });
  } catch (error) {
    next(error);
  }
};
