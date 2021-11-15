var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;


process.on('SIGINT', function() {
    process.exit();
});

app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({limit: '25mb'}));

const routes = require('./api/routes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('vic10us Images RESTful API server started on: ' + port);
