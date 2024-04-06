const LearningMaterial = require('../models/learningMaterial.model');
const Course = require('../models/course.model');

const AppError = require('../utilities/AppError');
const excludeColums = ['createdAt', 'updatedAt'];

class LearningMaterialService {
  async createLearningMaterial(data) {
    const learningMaterialsCount = await LearningMaterial.findOne({
      order: [['number', 'DESC']],
    });
    const learningMaterial = LearningMaterial.build({
      ...data,
      number: (learningMaterialsCount ? learningMaterialsCount.number : 0) + 1,
    });
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

  async findLearningMaterialsByCourseId(courseId) {
    return await LearningMaterial.findAll({
      where: { courseId },
      attributes: { exclude: excludeColums },
      include: [Course],
    });
  }

  async updateLearningMaterial(id, data) {
    const learningMaterial = await LearningMaterial.update(
      { content: data.content, contributionLevel: data.contributionLevel },
      { where: { id } }
    );
    excludeColums.forEach((column) => {
      learningMaterial[column] = undefined;
    });
    return learningMaterial;
  }

  async deleteLearningMaterial(id) {
    const learningMaterial = await LearningMaterial.findOne({ where: { id } });
    if (!learningMaterial) throw new AppError('Learning Material not found', 404);
    await learningMaterial.destroy();
    return learningMaterial;
  }
}

module.exports = new LearningMaterialService();
