const LearningMaterial = require('../models/learningMaterial.model');
const Course = require('../models/course.model');

const excludeColums = ['createdAt', 'updatedAt'];

class LearningMaterialService {
  async createLearningMaterial(data) {
    console.log(data);
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
      include: [Course],
    });
  }

  async findAllLearningMaterials() {
    return await LearningMaterial.findAll({
      attributes: { exclude: excludeColums },
      include: [Course],
    });
  }

  async findMyLearningMaterials(userId) {
    return await LearningMaterial.findAll({
      where: { userId },
      attributes: { exclude: excludeColums },
      include: [Course],
    });
  }

  async updateLearningMaterial(id, data) {
    const learningMaterial = await LearningMaterial.update(data, { where: { id } });
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
