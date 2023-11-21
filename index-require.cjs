const checkOptions  = require('./helpers-require/check-options.cjs');
const ensurePathsParam = require('./helpers-require/paths-param.cjs');
const fulfillReturn = require('./helpers-require/fulfill-return.cjs');

const depthGauge = function (pathsArg, optionsObj, callbackFn) {

    let options;
    let callback;

    switch (arguments.length) {
        case 3:
            options = checkOptions(optionsObj);
            callback = callbackFn;
            break;
        case 2:
            if (Object.prototype.toString.call(arguments[1]) === '[object Function]') {
                callback = arguments[1];
                options = checkOptions(null);
            } else {
                options = checkOptions(optionsObj);
            }
            break;
        default:
            options = checkOptions(null);
            break;
    }

    const paths = ensurePathsParam(pathsArg);

    const result = fulfillReturn(options, paths);

    if (callback) callback(result, paths);
     
    return result;

     
}

const depthGaugeAsync = async function (pathsArg, optionsObj) {

    let options = checkOptions(optionsObj);

    const paths = ensurePathsParam(pathsArg);

    const result = fulfillReturn(options, paths);

    return result;

};

module.exports = depthGauge;
module.exports.async = depthGaugeAsync;