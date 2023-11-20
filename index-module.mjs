import { checkOptions } from './helpers-module/check-options.mjs';
import { unifyPathsParam } from './helpers-module/paths-param.mjs';
import { fulfillReturn } from './helpers-module/fulfill-return.mjs';

export const depthGauge = function (pathsArg, optionsObj, callbackFn) {

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

    const paths = unifyPathsParam(pathsArg);

    const result = fulfillReturn(options, paths);

    if (callback) callback(result, paths);
     
    return result;

     
}

export const depthGaugeAsync = async function (pathsArg, optionsObj) {

    let options = checkOptions(optionsObj);

    const paths = unifyPathsParam(pathsArg);

    const result = fulfillReturn(options, paths);

    return result;

};

export default depthGauge;