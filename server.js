const express = require('express');
const {join} = require('path');
const morgan = require("morgan");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require('swagger-jsdoc');
const docs = require('./api/docs');

const app = express();
const PORT = process.env.PORT || 3000;

process.on('SIGINT', function() {
    process.exit();
});

app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({limit: '25mb'}));
app.use(morgan("dev"));
app.use(cors());
const options = {
    definition: docs,
    apis: ['./api/routes/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);

const setupSUI = (req, res) => {
    swaggerUI.setup(swaggerSpec);
};

app.get("/api-docs/swagger.json", (req, res) => res.json(swaggerSpec));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

const routes = require('./api/routes'); //importing route
routes.setup(app); //register the route

//initialize the app.
async function initialize(){    
  app.listen(PORT);
};

initialize()
    .finally(
        () => console.log(`vic10us Images RESTful API server started on: ${PORT}`)
    );
