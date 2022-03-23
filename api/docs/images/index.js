const convertImage = require('./convert-image');

module.exports = {
    paths: {
        '/images/conversions': {
            ...convertImage,
        },
    },
};