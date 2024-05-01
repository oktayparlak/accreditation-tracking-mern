const ApplicationService = require('../services/application.service');

/** Create */
exports.create = async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data);
    const reports = req.files;
    const application = await ApplicationService.createApplication(req.user.id, data, reports);
    res.status(201).json(application);
  } catch (error) {
    next(error);
  }
};

exports.downloadFile = async (req, res, next) => {
  try {
    const file = await ApplicationService.downloadFile(req.params.id);
    return res.download(file.url);
  } catch (error) {
    next(error);
  }
};

/** Get */
exports.getAll = async (req, res, next) => {
  try {
    const applications = await ApplicationService.findAllApplications();
    res.status(200).json(applications);
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const application = await ApplicationService.findApplicationById(req.params.id);
    res.status(200).json(application);
  } catch (error) {
    next(error);
  }
};

/** Update */
exports.update = async (req, res, next) => {};

/** Delete */
exports.delete = async (req, res, next) => {};
