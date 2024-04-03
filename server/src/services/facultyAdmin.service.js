const FacultyAdmin = require('../models/facultyAdmin.model');
const Faculty = require('../models/faculty.model');
const User = require('../models/user.model');

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
    await FacultyAdmin.destroy({ where: { id } })
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }
}

module.exports = new FacultyAdminService();
