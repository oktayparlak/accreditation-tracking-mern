const LearningMaterial = require('../models/learningMaterial.model');

const excludeColums = ['isDeleted', 'createdAt', 'updatedAt'];

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
      where: { id, isDeleted: false },
      attributes: { exclude: excludeColums },
    });
  }

  async findAllLearningMaterials() {
    return await LearningMaterial.findAll({
      where: { isDeleted: false },
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
    LearningMaterial.update({ where: { id } }, { isDeleted: true })
      .then(() => {
        return true;
      })
      .catch((error) => {
        throw error;
      });
  }
}

module.exports = new LearningMaterialService();
