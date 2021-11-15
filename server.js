var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
//const mongoose = require('mongoose'),
//const Task = require('./api/models/todoListModel'); //created model loading here
const Handlebars = require("handlebars");

Handlebars.registerHelper('ifEmptyOrWhitespace', function (value, options) {
  if (!value) { return options.fn(this); }
  return value.replace(/\s*/g, '').length === 0
      ? options.fn(this)
      : options.inverse(this);
});
Handlebars.registerHelper({
  eq: (v1, v2) => v1 === v2,
  ne: (v1, v2) => v1 !== v2,
  lt: (v1, v2) => v1 < v2,
  gt: (v1, v2) => v1 > v2,
  lte: (v1, v2) => v1 <= v2,
  gte: (v1, v2) => v1 >= v2,
  and() {
      return Array.prototype.every.call(arguments, Boolean);
  },
  or() {
      return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
  }
});

//mongoose instance connection url connection
//mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost/Tododb', {useNewUrlParser: true}); 
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({limit: '25mb'}));

const routes = require('./api/routes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('vic10us Images Api RESTful API server started on: ' + port);
