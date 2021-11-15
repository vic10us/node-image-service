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
  console.log(file.mimetype);
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
  var controller = require('../controllers/rankController');

  app.route('/rank/test')
    .get(controller.get_image);

  app.route('/lorembarnak')
    .get(controller.get_bad_words);

  app.route('/lorembarnak/:numWords')
    .get(controller.get_bad_words);

  app.route('/rank')
    .get(controller.get_rank);
    
  app.route('/rank/:userId')
    .get(controller.get_rank)
    .patch(controller.get_rank);
  
  app.route('/rank/:userId/image')
    .get(controller.get_rank)
    .post(controller.create_rank_card);
};
