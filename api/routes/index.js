'use strict';
// var todoRoutes = require('./todoListRoutes');
// var rankRoutes = require('./rankRoutes');
var imagesRoutes = require('./imagesRoutes');

module.exports = function(app) {

    // rankRoutes(app);
    imagesRoutes(app);

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