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

module.exports.setup = (app) => {
  var controller = require('../controllers/imagesController');

  /**
   * @swagger
   * /images/conversions:
   *   post:
   *     tags: [Images]
   *     summary: Convert a single image
   *     description: Convert a single image
   *     consumes:
   *       - multipart/form-data
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               image:
   *                 type: string
   *                 format: binary
   *                 required: true
   *               dpi:
   *                 type: integer
   *                 required: false
   *               keep:
   *                 type: boolean
   *                 required: false
   *     responses:
   *       200:
   *         description: Returns an image in the requested format
   */
  app.route('/images/conversions')
    .post(
      upload.single('image'),
      controller.convert_svg_image);
};

/**
*     parameters:
*       - in: formData
*         name: file
*         description: The number of words to request
*         required: true
*         type: file
*       - in: formData
*         name: dpi
*         type: integer
*         description: Image density in dpi
*         required: false
*       - in: formData
*         name: keep
*         required: false
*         type: boolean
*         description: Should the server keep image in local cache?
*/