const Application = require('../models/application.model');
const User = require('../models/user.model');
const Course = require('../models/course.model');
const File = require('../models/file.model');
const Question = require('../models/question.model');
const QuestionLearningMaterial = require('../models/questionLearningMaterial.model');
const LearningMaterial = require('../models/learningMaterial.model');
const MeasuringTool = require('../models/measuringTool.model');

const AppError = require('../utilities/AppError');
const excludeColums = ['updatedAt'];

class ApplicationService {
  async createApplication(userId, data, files) {
    let x = 0,
      y = 0,
      z = 0,
      t = 0,
      f = 0,
      r = 0;
    const application = Application.build({ userId, courseId: data.courseId });
    await application.save();
    for (let file of files) {
      await File.create({ applicationId: application.id, name: file.originalname, url: file.path });
    }
    for (const tool of data.measuringTools) {
      const measuringTool = await MeasuringTool.findByPk(tool.id);
      if (!measuringTool) throw new AppError('Measuring Tool not found', 404);
      x = measuringTool.impactRate / 100;
      for (const question of tool.questions) {
        y = question.average / 100;
        z = question.average / question.fullPoint;
        f = question.fullPoint / 100;
        t = x * z * f;
        r = x * f;
        const newQuestion = Question.build({
          measuringToolId: tool.id,
          number: question.number,
          average: question.average,
          fullPoint: question.fullPoint,
        });
        await newQuestion.save();
        for (const learningMaterialId of question.relatedItems) {
          const learningMaterial = await LearningMaterial.findByPk(learningMaterialId);
          if (!learningMaterial) throw new AppError('Learning Material not found', 404);
          learningMaterial.impactSum = parseFloat(learningMaterial.impactSum) + t;
          learningMaterial.impactTotal = parseFloat(learningMaterial.impactTotal) + r;
          await learningMaterial.save();
          const questionLearningMaterial = QuestionLearningMaterial.build({
            questionId: newQuestion.id,
            learningMaterialId: learningMaterial.id,
          });
          await questionLearningMaterial.save();
        }
      }
    }
    const learningMaterials = await LearningMaterial.findAll({
      where: { courseId: data.courseId },
    });
    console.log(learningMaterials);
    for (const learningMaterial of learningMaterials) {
      let result = (learningMaterial.impactSum / learningMaterial.impactTotal) * 100;
      learningMaterial.succesRate = result;

      if (result >= 80) {
        learningMaterial.succesPoint = 5;
      } else if (result >= 60 && result < 80) {
        learningMaterial.succesPoint = 4;
      } else if (result >= 45 && result < 60) {
        learningMaterial.succesPoint = 3;
      } else if (result >= 35 && result < 45) {
        learningMaterial.succesPoint = 2;
      } else {
        learningMaterial.succesPoint = 1;
      }
      await learningMaterial.save();
    }
    return application;
  }

  async downloadFile(id) {
    const file = await File.findByPk(id);
    if (!file) throw new AppError('File not found', 404);
    return file;
  }

  async findApplicationById(id) {
    const application = await Application.findOne({
      where: { id },
      include: [
        { model: User, attributes: { exclude: excludeColums } },
        { model: Course, attributes: { exclude: excludeColums } },
      ],
      attributes: { exclude: excludeColums },
    });
    if (!application) throw new AppError('Application not found', 404);
    const measuringTools = await MeasuringTool.findAll({
      where: { courseId: application.courseId },
      attributes: { exclude: excludeColums },
    });
    for (const measuringTool of measuringTools) {
      const questions = await Question.findAll({
        where: { measuringToolId: measuringTool.id },
        attributes: { exclude: excludeColums },
      });
      measuringTool.dataValues.questions = questions;
      for (const question of measuringTool.dataValues.questions) {
        question.dataValues.relatedItems = await QuestionLearningMaterial.findAll({
          where: { questionId: question.id },
          include: [{ model: LearningMaterial, attributes: { exclude: excludeColums } }],
          attributes: { exclude: excludeColums },
        });
      }
    }
    application.dataValues.MeasuringTools = measuringTools;
    application.dataValues.Files = await File.findAll({
      where: { applicationId: application.id },
      attributes: { exclude: excludeColums },
    });
    return application;
  }

  async findAllApplications() {
    return await Application.findAll({
      include: [User, Course],
      attributes: { exclude: excludeColums },
      order: [['createdAt', 'DESC']],
    });
  }

  async updateApplication(id, data) {}

  async deleteApplication(id) {}
}

module.exports = new ApplicationService();
