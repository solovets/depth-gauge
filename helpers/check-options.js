const depthGaugeOptions = function (options) {

    const optionsInterface = {
        sort: {
            types: ['undefined', 'string'],
            values: [undefined, 'asc', 'desc']
        }
    };

    const optionsDefaults = {
        sort: undefined,
        single: false
    };

    const stringifyArray = (input) => {
        let output = [];

        input.forEach((item) => {
            if (item === undefined) {
                output.push('undefined');
            } else if (item === null) {
                output.push('null');
            } else if (typeof item === 'object') {
                output.push(JSON.stringify(item));
            } else {
                output.push(item);
            }

        });

        return output.join('|');
    };

    let _OPTIONS = {};

    if (options && typeof options === 'object' && Array.isArray(options) === false && options !== null) {

        for (let key in options) {

            let _val = options[key];

            if (optionsDefaults.hasOwnProperty(key)) {

                if (optionsInterface[key].types.includes(typeof _val)) {

                    if (optionsInterface[key].hasOwnProperty('values')) {

                        _val = typeof _val === 'string' ? _val.toLowerCase() : _val;

                        if (optionsInterface[key].values.includes(_val)) {
                            _OPTIONS[key] = _val;
                        } else {
                            console.warn(`[depth-gauge] '${_val}' is not valid value for '${key}' option. '${key}' is set to default value '${optionsDefaults[key]}'`);
                        }

                    } else {
                        _OPTIONS[key] = _val;
                    }

                } else {
                    console.warn(`[depth-gauge] '${key}' option must be of type '${stringifyArray(optionsInterface[key].types)}', got '${typeof options[key]}'`);
                }

            } else {
                console.warn(`[depth-gauge] Unknown option '${key}'`);
            }

        }

        for (let key in optionsDefaults) {
            if (_OPTIONS.hasOwnProperty(key) === false) _OPTIONS[key] = optionsDefaults[key];
        }

    } else {
        _OPTIONS = optionsDefaults;
    }

    return _OPTIONS;
};

module.exports = depthGaugeOptions;