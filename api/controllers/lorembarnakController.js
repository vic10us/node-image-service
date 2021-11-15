'use strict';

const lb = require('lorembarnak');

exports.get_bad_words = async (req, res) => {
  let num = req.params.numWords || 10;
  let respon = lb.getText(num);
  res.send(respon);
};
