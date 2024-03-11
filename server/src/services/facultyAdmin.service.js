const FacultyAdmin = require('../models/facultyAdmin.model');
const Faculty = require('../models/faculty.model');
const User = require('../models/user.model');

const excludeColums = ['isDeleted', 'createdAt', 'updatedAt', 'password'];

class FacultyAdminService {
  async createFacultyAdmin(data) {}

  async findFacultyAdminById(id) {}

  async findAllFacultyAdmins() {}

  async updateFacultyAdmin(id, data) {}

  async deleteFacultyAdmin(id) {}
}

module.exports = new FacultyAdminService();
