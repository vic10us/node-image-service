'use strict';
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${new Date().valueOf()}-${file.originalname}`);
  }
});

const allowedImageMimeTypes = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'text/plain'
];

const imageFilter = (req, file, cb) => {
  if (!allowedImageMimeTypes.includes(file.mimetype)) {
    cb(new Error(`Invalid file format. '${file.mimetype}' is not accepted}`), false);
    return;
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: imageFilter
});

module.exports = function(app) {
  var controller = require('../controllers/imagesController');

  app.route('/images/conversions')
    .post(upload.single('image'), controller.convert_svg_image);
  
};
