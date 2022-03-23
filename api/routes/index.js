'use strict';
var lorembarnakRoutes = require('./lorembarnakRoutes');
var imagesRoutes = require('./imagesRoutes');

module.exports.setup = (app) => {

    lorembarnakRoutes.setup(app);
    imagesRoutes.setup(app);

    app.use(function(req, res) {
        res.status(404)
           .send({
               headers: req.headers,
               url: req.url,
               originalUrl: req.originalUrl,
               error: `${req.originalUrl} not found`
            })
    });
};