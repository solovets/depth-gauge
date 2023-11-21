const path = require('path');

const getDepth = function (inputPath) {

    if (inputPath === '') {
        return 0;
    }

    const normalizedInputPath = path.normalize(inputPath);
    
    const inputPathItems = normalizedInputPath.split(path.sep);

    const filteredInputPathItems = inputPathItems.filter((item) => {
        return item !== '.' && item.length > 0
    });

    const depth = filteredInputPathItems.reduce(
        (previous, current) => {
            if (current === '..') {
                return previous - 1;
            } else {
                return previous + 1;
            }
        },
        0
    );

    return depth;
};

module.exports = getDepth;