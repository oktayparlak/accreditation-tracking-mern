const Application = require('../models/application.model');
const File = require('../models/file.model');
const Question = require('../models/question.model');
const QuestionLearningMaterial = require('../models/questionLearningMaterial.model');
const LearningMaterial = require('../models/learningMaterial.model');
const MeasuringTool = require('../models/measuringTool.model');

const excludeColums = ['createdAt', 'updatedAt'];

class ApplicationService {
  async createApplication(userId, data, files) {
    const application = Application.build({ userId, courseId: data.courseId });
    await application.save();
    for (let file of files) {
      await File.create({ applicationId: application.id, name: file.name, url: file.url });
    }
    for (const measuringTools of data.measuringTools) {
      const measuringTool = await MeasuringTool.findByPk(measuringTools.id);
      if (!measuringTool) throw new AppError('Measuring Tool not found', 404);
      for (const question of measuringTool.questions) {
        const newQuestion = Question.build({
          measuringToolId: measuringTool.id,
          number: question.number,
          avarage: question.avarage,
          fullPoint: question.fullPoint,
        });
        await newQuestion.save();
        for (const learningMaterialId of question.relatedItems) {
          const learningMaterial = await LearningMaterial.findByPk(learningMaterialId);
          if (!learningMaterial) throw new AppError('Learning Material not found', 404);
          await QuestionLearningMaterial.create({
            questionId: newQuestion.id,
            learningMaterialId: learningMaterial.id,
          });
        }
      }
    }
  }

  async findApplicationById(id) {}

  async findAllApplications() {}

  async updateApplication(id, data) {}

  async deleteApplication(id) {}
}
