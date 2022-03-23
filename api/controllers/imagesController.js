'use strict';

const fs = require('fs');
const sharp = require("sharp");

exports.convert_svg_image = async (req, res, next) => {
  console.log(req.file);
  if (req.file.mimetype !== 'image/svg+xml') {
    res.json(req.file);
    return;
  }

  var dpi = parseInt(req.body.dpi || 144, 10);

  var img = await sharp(req.file.path, { density: dpi })
    .png()
    .toBuffer();

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': img.length
  });
  res.end(img);
  if (req.body.keep?.toLowerCase() === 'true') return;

  await fs.unlink(req.file.path, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};
