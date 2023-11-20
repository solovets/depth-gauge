import chalk from "chalk";

export const isPathsParamValid = (pathsOption) => {

    const err = chalk.bgRed.white(' [depth-gauge] [error] ');

    let result = {
        valid: true,
        type: 'string',
        message: ''
    };
    
    if (typeof pathsOption === 'string') return result;

    if (typeof pathsOption === 'object' && Array.isArray(pathsOption) === true) {

        for (let i = 0; i < pathsOption.length; i++) {
            if (typeof pathsOption[i] !== 'string') {
                result.valid = false;
                result.type = typeof pathsOption[i];
                result.message = `${err} Each item of array of "paths" option must be of type "string", got "${typeof pathsOption[i]}" for "${pathsOption[i]}"`;
            }
        }

        if (pathsOption.length === 0) {
            result.valid = false;
            result.type = 'object';
            result.message = `${err} "paths" option must of type "string"|"string[]", got empty array`;
        }


        result.type = 'object';
    
    } else {
        result.valid = false;
        result.type = typeof pathsOption;
        result.message = `${err} "paths" argument must be of type "string"|"string[]", got "${typeof pathsOption}"`;
    }

    return result;
};

export const unifyPathsParam = (paths, options) => {
    const isValid = isPathsParamValid(paths);
    
    if (isValid.valid === true) {
        switch (isValid.type) {
            case 'object':
                return paths;
            case 'string':
                return [paths];
        }
    } else {
        throw new Error(isValid.message);
    }
};