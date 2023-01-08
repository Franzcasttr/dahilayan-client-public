import multer from 'multer';
import path from 'path';

// const alllowedImage = ['images/jpeg', 'images/png', 'images/jpg'];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), 'public', 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + '-' + file.originalname);
  },
});

export const uploadImage = multer({
  storage,
  //   fileFilter: function (req, file, cb) {
  //     if (alllowedImage.includes(file.mimetype)) {
  //       cb(null, true);
  //     } else {
  //       cb(new Error('Not supported file format'), false);
  //     }
  //   },
});
