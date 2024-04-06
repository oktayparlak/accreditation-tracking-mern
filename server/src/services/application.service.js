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
  }

  async findApplicationById(id) {}

  async findAllApplications() {}

  async updateApplication(id, data) {}

  async deleteApplication(id) {}
}
