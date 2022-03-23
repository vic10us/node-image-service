const getLoremBarnak = require('./get-lorembarnak');
const getLoremBarnakByLength = require('./get-lorembarnak-by-length');

module.exports = {
    paths: {
        '/lorembarnak': {
            ...getLoremBarnak,
        },
        '/lorembarnak/{numWords}': {
            ...getLoremBarnakByLength
        }
    }
};