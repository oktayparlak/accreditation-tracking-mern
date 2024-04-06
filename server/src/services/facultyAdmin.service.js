const FacultyAdmin = require('../models/facultyAdmin.model');
const Faculty = require('../models/faculty.model');
const User = require('../models/user.model');

const AppError = require('../utilities/AppError');
const excludeColums = ['createdAt', 'updatedAt', 'password'];

class FacultyAdminService {
  async createFacultyAdmin({ userId, facultyId }) {
    const facultyAdmin = FacultyAdmin.build({
      userId,
      facultyId,
    });
    await facultyAdmin.save();
    return facultyAdmin;
  }

  async findFacultyAdminById(id) {
    const facultyAdmin = await FacultyAdmin.findByPk(id, {
      include: [
        {
          model: User,
          attributes: { exclude: excludeColums },
        },
        {
          model: Faculty,
          attributes: { exclude: excludeColums },
        },
      ],
    });
    return facultyAdmin;
  }

  async findAllFacultyAdmins() {
    const facultyAdmins = await FacultyAdmin.findAll({
      include: [
        {
          model: User,
          attributes: { exclude: excludeColums },
        },
        {
          model: Faculty,
          attributes: { exclude: excludeColums },
        },
      ],
    });
    return facultyAdmins;
  }

  async findAllFacultyAdminsWithRole() {
    const facultyAdmins = await FacultyAdmin.findAll({
      include: [
        {
          model: User,
          attributes: { exclude: excludeColums },
          where: { role: 'FACULTY_ADMIN' },
        },
        {
          model: Faculty,
          attributes: { exclude: excludeColums },
        },
      ],
    });
    return facultyAdmins;
  }

  async updateFacultyAdmin(id, data) {}

  async deleteFacultyAdmin(id) {
    const facultyAdmin = await FacultyAdmin.findByPk(id);
    if (!facultyAdmin) {
      throw new AppError('Faculty Admin not found', 404);
    }
    await facultyAdmin.destroy();
    return facultyAdmin;
  }
}

module.exports = new FacultyAdminService();
