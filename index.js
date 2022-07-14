const checkOptions = require('./helpers/check-options');
const pathsParamData   = require('./helpers/paths-param');
const fulfillReturn   = require('./helpers/fulfill-return');

const depthGauge = function (paths, options, callback) {

    let _OPTIONS;

    if (arguments.length == 2) {
        if (Object.prototype.toString.call(arguments[1]) === '[object Function]') {
            callback = arguments[1];
            _OPTIONS = checkOptions(null);
        } else {
            callback = null;
            _OPTIONS = checkOptions(options);
        }
    } else {
        _OPTIONS = checkOptions(options);
    }

    const pathsParam = pathsParamData(paths);

    let _PATHS;

    if (pathsParam.valid === true) {
        _PATHS = paths;
    } else {
        throw new Error(pathsParam.message);
    }

    _OPTIONS.single = pathsParam.type === 'string';

    let _RETURN = fulfillReturn(_OPTIONS, _PATHS);

    if (callback && Object.prototype.toString.call(callback) === '[object Function]') {
        callback(_RETURN, _PATHS);
    }

    return _RETURN;
}

const depthGaugeAsync = async function (paths, options) {

    let _OPTIONS = checkOptions(options);

    const pathsParam = pathsParamData(paths);

    let _PATHS;

    if (pathsParam.valid === true) {
        _PATHS = paths;
    } else {
        throw new Error(pathsParam.message);
    }

    _OPTIONS.single = pathsParam.type === 'string';

    let _RETURN = fulfillReturn(_OPTIONS, _PATHS);

    return _RETURN;

};

module.exports = depthGauge;

module.exports.async = depthGaugeAsync;