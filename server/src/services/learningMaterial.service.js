const LearningMaterial = require('../models/learningMaterial.model');

const excludeColums = ['createdAt', 'updatedAt'];

class LearningMaterialService {
  async createLearningMaterial(data) {
    const learningMaterial = LearningMaterial.build(data);
    await learningMaterial.save();
    excludeColums.forEach((column) => {
      learningMaterial[column] = undefined;
    });
    return learningMaterial;
  }

  async findLearningMaterialById(id) {
    return await LearningMaterial.findOne({
      where: { id },
      attributes: { exclude: excludeColums },
    });
  }

  async findAllLearningMaterials() {
    return await LearningMaterial.findAll({
      attributes: { exclude: excludeColums },
    });
  }

  async updateLearningMaterial(id, data) {
    const learningMaterial = await LearningMaterial.update({ where: { id } }, data);
    excludeColums.forEach((column) => {
      learningMaterial[column] = undefined;
    });
    return learningMaterial;
  }

  deleteLearningMaterial(id) {
    LearningMaterial.destroy({ where: { id } })
      .then(() => {
        return true;
      })
      .catch((error) => {
        throw error;
      });
  }
}

module.exports = new LearningMaterialService();
