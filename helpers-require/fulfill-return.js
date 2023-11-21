const getDepth = require('./get-depth');

module.exports = function(options, paths) {

    let _RETURN;

    switch (options.single) {
        case true:
            _RETURN = getDepth(paths);
            break;
        case false:
            let arr = [];
            for (let i = 0; i < paths.length; i++) {
                let item = paths[i];
                arr.push({
                    path: item,
                    depth: getDepth(item)
                });
            }
            _RETURN = arr;
            break;
    }

    if (options.single === false && options.sort) {

        switch (options.sort) {
            case 'asc':
                _RETURN.sort((a, b) => a.depth - b.depth);
                break;
            case 'desc':
                _RETURN.sort((a, b) => b.depth - a.depth);
                break;
        }

    }

    return _RETURN;
};