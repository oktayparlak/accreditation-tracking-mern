const LearningMaterialService = require('../services/learningMaterial.service');

/** Create */
exports.create = async (req, res, next) => {
  try {
    const learningMaterial = await LearningMaterialService.createLearningMaterial(req.body);
    res.status(201).json(learningMaterial);
  } catch (error) {
    next(error);
  }
};

/** Read */
exports.getAll = async (req, res, next) => {
  try {
    const learningMaterials = await LearningMaterialService.findAllLearningMaterials();
    if (!learningMaterials || learningMaterials.length === 0)
      return res.status(404).json({ error: { message: 'Learning materials not found' } });
    return res.status(200).json(learningMaterials);
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const learningMaterial = await LearningMaterialService.findLearningMaterialById(req.params.id);
    if (!learningMaterial)
      return res.status(404).json({ error: { message: 'Learning material not found' } });
    return res.status(200).json(learningMaterial);
  } catch (error) {
    next(error);
  }
};

/** Update */
exports.update = async (req, res, next) => {
  try {
    const learningMaterial = await LearningMaterialService.updateLearningMaterial(
      req.params.id,
      req.body
    );
    if (!learningMaterial)
      return res.status(404).json({ error: { message: 'Learning material not found' } });
    return res.status(200).json(learningMaterial);
  } catch (error) {
    next(error);
  }
};

/** Delete */
exports.delete = (req, res, next) => {
  try {
    const learningMaterial = LearningMaterialService.deleteLearningMaterial(req.params.id);
    if (!learningMaterial)
      return res.status(404).json({ error: { message: 'Learning material not found' } });
    return res.status(200).json({ message: 'Learning material deleted' });
  } catch (error) {
    next(error);
  }
};
