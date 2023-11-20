import chalk from 'chalk';

export const checkOptions = (optionsObj) => {

    const warn = chalk.bgYellow.black(' [depth-gauge] [warn] ');

    const optionsInterface = {
        sort: {
            types: ['undefined', 'string'],
            values: [undefined, 'asc', 'desc']
        }
    };

    const optionsDefaults = {
        sort: undefined
    };

    let options = {};

    const checkValue = (key, value) => {
        value = typeof value === 'string' ? value.toLowerCase() : value;

        if (optionsInterface[key].values.includes(value)) {
            options[key] = value;
        } else {
            console.warn(`${warn} "${value}" is not valid value for '${key}' option.\n"${key}" is set to default value "${optionsDefaults[key]}"`);
        }
    };

    const checkType = (key, value) => {
        switch (optionsInterface[key].types.includes(typeof value)) {
            case true:
                if (optionsInterface[key].hasOwnProperty('values')) {
                    checkValue(key, value);
                } else {
                    options[key] = value;
                }
                break;
            case false:
                console.warn(`${warn} "${key}" option must be of type "${optionsInterface[key].types.join('|')}", got "${typeof value}"\n"${key}" is set to default value "${optionsDefaults[key]}"`);
                break;
        }
    };

    if (
        optionsObj &&
        typeof optionsObj === 'object' &&
        Array.isArray(optionsObj) === false &&
        optionsObj !== null
    ) {

        for (let key in optionsObj) {

            let value = optionsObj[key];

            switch (optionsDefaults.hasOwnProperty(key)) {
                case true:
                    checkType(key, value);
                    break;
                case false:
                    console.warn(`${warn} Unknown option "${key}"`);
                    break;
            }
        }

        for (let key in optionsDefaults) {
            if (options.hasOwnProperty(key) === false) {
                options[key] = optionsDefaults[key];
            }
        }

    } else {
        options = optionsDefaults;
    }

    return options;
};