const isPathsOptionValid = function(pathsOption) {
    
    if (typeof pathsOption === 'string') {

        return {
            valid: true,
            type: 'string'
        };

    }

    if (typeof pathsOption === 'object' && Array.isArray(pathsOption) === true) {

        for (let i = 0; i < pathsOption.length; i++) {
            if (typeof pathsOption[i] !== 'string') {
                return {
                    valid: false,
                    message: `[depth-gauge] Each 'path' of 'paths' option must be of type 'string', got '${typeof pathsOption[i]}' for '${pathsOption[i]}'`
                };
            }
        }

        if (pathsOption.length === 0) {
            return {
                valid: false,
                message: `[depth-gauge] 'paths' option must be an array of strings, got empty array`
            };
        }


        return {
            valid: true,
            type: 'object'
        };
    
    }

    return {
        valid: false,
        message: `[depth-gauge] Unexpected error of 'paths' option. Expected 'string' or 'string'[], got ${typeof pathsOption}`
    }
};

module.exports = isPathsOptionValid;