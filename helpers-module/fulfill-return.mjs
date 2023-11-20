import { getDepth } from "./get-depth.mjs";

export const fulfillReturn = (options, paths) => {

    let result;

    switch (paths.length === 1) {
        case true:
            let item = paths[0];
            result = {
                path: item,
                depth: getDepth(item)
            };
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
            result = arr;
            break;
    }

    if (
        paths.length > 1 &&
        typeof options === 'object' &&
        options !== null &&
        options.hasOwnProperty('sort')
    ) {

        switch (options.sort) {
            case 'asc':
                result.sort((a, b) => a.depth - b.depth);
                break;
            case 'desc':
                result.sort((a, b) => b.depth - a.depth);
                break;
        }

    }

    return result;
};