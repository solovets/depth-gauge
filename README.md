# depth-gauge

_Returns depth of provided path(s)_

### Install

```
npm i depth-gauge
```

After defining `path-gauge` in your script:

```js
// cjs syntax
const depthGauge = require('depth-gauge');
// or mjs syntax
import { depthGauge, depthGaugeAsync } from 'depth-gauge';
```

you can use `depth-gauge` synchronously:

```js
const myDepths = depthGauge(paths [, options, callback]);
```

or asynchronously:

```js
// cjs
depthGauge.async(paths [, options])
    .then(data => /* do stuff */)
    .catch(error => /* error */);
// mjs
depthGaugeAsync(paths [, options])
    .then(data => /* do stuff */)
    .catch(error => /* error */);
```

### Usage: sync

**Single path**

```js
const var1 = depth('a/b/c');      // var1 = 3
const var2 = depth('./');         // var2 = 0
const var3 = depth('../../d/');   // var3 = -1
const var4 = depth('e\\f\\g');    // var4 = 3
const var5 = depth('\\h\\..\\i'); // var5 = 1
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

function cb() {
    console.log('done');
}

const var6 = depth(paths);
// var6 = [
//     { path: 'a/b/c',      depth: 3 },
//     { path: './',         depth: 0 },
//     { path: '../../d/',   depth: -1 },
//     { path: 'e\\f\\g',    depth: 3 },
//     { path: '\\h\\..\\i', depth: 1 }
// ]

const var7 = depth(paths, cb);
// => done
// var7 = [
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

const var8 = depth(['\\h\\..\\i', '../../d/'], cb);
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

const var9 = depth(['\\h\\..\\i', '../../d/'], {sort: 'ASC'}, cb);
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
