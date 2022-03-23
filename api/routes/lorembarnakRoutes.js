'use strict';

module.exports.setup = (app) => {
  var controller = require('../controllers/lorembarnakController');

  /**
   * @swagger
   * /lorembarnak:
   *   get:
   *     tags: [Extras]
   *     description: Get's a lorem-barnak string :)
   *     responses:
   *       200:
   *         description: Returns a lorem-barnak
   */
  app.get('/lorembarnak', controller.get_bad_words);

  /**
   * @swagger
   * /lorembarnak/{numWords}:
   *   get:
   *     tags: [Extras]
   *     summary: Get's a lorem-barnak string of a specific length :)
   *     description: Get's a lorem-barnak string of a specific length :)
   *     parameters:
   *       - in: path
   *         name: numWords
   *         required: true
   *         description: The number of words to request
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Returns a lorem-barnak
   */
   app.get('/lorembarnak/:numWords', controller.get_bad_words);

};
