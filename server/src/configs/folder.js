const fs = require('fs');
const path = require('path');

// Dosya yolu oluşturma fonksiyonu
const createUploadsFolder = (userId, callback) => {
  const folderPath = `public/data/uploads/${userId}`;

  // İlgili dizinin var olup olmadığını kontrol ediyoruz
  fs.access(folderPath, (error) => {
    if (error) {
      // Dizin yoksa oluşturuyoruz
      fs.mkdir(folderPath, { recursive: true }, (err) => {
        if (err) {
          return callback(err);
        }
        callback(null, folderPath);
      });
    } else {
      // Dizin zaten varsa yolunu döndürüyoruz
      callback(null, folderPath);
    }
  });
};

module.exports = createUploadsFolder;
