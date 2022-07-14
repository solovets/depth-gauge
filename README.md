# Depth-gauge

_Returns depth of provided path(s)_

[![Created by Itentika](https://img.shields.io/badge/Created%20by-Itentika-blue)](https://itentika.ru)

### Install

```
npm i depth-gauge
```

### Usage: basic

After defining `path-gauge` in your script:

```js
const depth = require('depth-gauge');
```

you can use `depth-gauge` synchronously:

```js
const myDepths = depth(paths [, options, callback]);
```

or asynchronously:

```js
depth.async(paths [, options])
    .then(data => /* do stuff */)
    .catch(error => /* error */)
```

### Usage: sync

```js
const depth = require('depth-gauge');

const paths = [
    'a/b/c',
    './',
    '../../d/',
    'e\\f\\g',
    '\\h\\..\\i'
];

function cb() {
    console.log('done');
}

const var1 = depth('a/b/c');
// var1 = 3

const var2 = depth(paths);
// var2 = [
//     { path: 'a/b/c',      depth: 3 },
//     { path: './',         depth: 0 },
//     { path: '../../d/',   depth: -1 },
//     { path: 'e\\f\\g',    depth: 3 },
//     { path: '\\h\\..\\i', depth: 1 }
// ]

const var3 = depth(paths, cb);
// => done
// var3 = [
//     { path: 'a/b/c',      depth: 3 },
//     { path: './',         depth: 0 },
//     { path: '../../d/',   depth: -1 },
//     { path: 'e\\f\\g',    depth: 3 },
//     { path: '\\h\\..\\i', depth: 1 }
// ]
```

### Usage: async

**Single path**

```js
const depth = require('depth-gauge');

depth.async('a/b/c')
    .then(data => {
        console.log(data);
        // => 3
    })
    .catch(error => console.log(error));
```

**Multiple paths**

```js
const depth = require('depth-gauge');

const paths = [
    'a/b/c',
    './',
    '../../d/',
    'e\\f\\g',
    '\\h\\..\\i'
];

depth.async(paths)
    .then(data => {
        console.log(data);
        /* =>
        [
            { path: 'a/b/c',      depth: 3 },
            { path: './',         depth: 0 },
            { path: '../../d/',   depth: -1 },
            { path: 'e\\f\\g',    depth: 3 },
            { path: '\\h\\..\\i', depth: 1 }
        ]
        */
    })
    .catch(error => console.log(error));
```

### Options

**`sort`**

Sorts result in ascending or descending order. Works for multiple paths.

Possible values: `'ASC'` | `'DESC'`

Default value: `undefined`

```js
const depth = require('./depth-gauge');

const paths = [
    'a/b/c',
    './',
    '../../d/',
    'e\\f\\g',
    '\\h\\..\\i'
];

depth.async(paths, {
    sort: 'ASC'
})
    .then(data => {
        console.log(data);
        /* =>
        [
            { path: '../../d/',   depth: -1 },
            { path: './',         depth: 0 },
            { path: '\\h\\..\\i', depth: 1 },
            { path: 'a/b/c',      depth: 3 },
            { path: 'e\\f\\g',    depth: 3 }
        ]
        */
    })
    .catch(error => console.log(error));
```

### callback(result, originalInput)

`callback` is a link to a callback function of synchronous call, that takes two arguments: `result` and `originalInput`.

```js
const depth = require('depth-gauge');

function cb(result, originalInput) {
    console.log('Result:', result);
    console.log('Original input:', originalInput);
}

const var4 = depth(['\\h\\..\\i', '../../d/'], cb);
// => Result: [ { path: '\\h\\..\\i', depth: 1 }, { path: '../../d/', depth: -1 } ]
// => Original input: [ '\\h\\..\\i', '../../d/' ]
// var4 = [
//     {
//         "path": "\\h\\..\\i",
//         "depth": 1
//     },
//     {
//         "path": "../../d/",
//         "depth": -1
//     }
// ]

const var5 = depth(['\\h\\..\\i', '../../d/'], {sort: 'ASC'}, cb);
// => Result: [ { path: '../../d/', depth: -1 }, { path: '\\h\\..\\i', depth: 1 } ]
// => Original input: [ '\\h\\..\\i', '../../d/' ]
// var5 = [
//     {
//         "path": "../../d/",
//         "depth": -1
//     },
//     {
//         "path": "\\h\\..\\i",
//         "depth": 1
//     }
// ]
```
