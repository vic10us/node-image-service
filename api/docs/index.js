const basicInfo = require('./basicInfo');
const servers = require('./servers');
const components = require('./components');
const tags = require('./tags');
const loremBarnak = require('./loremBarnak');
const images = require('./images');

module.exports = {
    ...basicInfo,
    ...components,
    ...tags,
};

// ...servers,
// ...loremBarnak,
// ...images,
//    ...todos
