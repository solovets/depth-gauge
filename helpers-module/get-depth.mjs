import { normalize, sep } from 'node:path';

export const getDepth = (inputPath) => {

    if (inputPath === '') return 0;

    const normalizedInputPath = normalize(inputPath);
    
    const inputPathItems = normalizedInputPath.split(sep);

    const filteredInputPathItems = inputPathItems.filter(item => {
        return item !== '.' && item.length > 0
    });

    const depth = filteredInputPathItems.reduce(
        (previous, current) => {
            if (current === '..') return previous - 1;
            return previous + 1;
        },
        0
    );

    return depth;
};