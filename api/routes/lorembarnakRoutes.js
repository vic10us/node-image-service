'use strict';

module.exports = function(app) {
  var controller = require('../controllers/lorembarnakController');

  app.route('/lorembarnak')
    .get(controller.get_bad_words);

  app.route('/lorembarnak/:numWords')
    .get(controller.get_bad_words);

};
