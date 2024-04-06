const multer = require('multer');
const createUploadsFolder = require('./folder');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Dosya yolunu oluşturuyoruz
    createUploadsFolder(req.user.id, (err, folderPath) => {
      if (err) {
        return cb(err);
      }
      cb(null, folderPath);
    });
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Yüklenen dosyanın adı
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
