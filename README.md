# depth-gauge [![NPM version](https://badge.fury.io/js/deph-gauge.svg)](http://badge.fury.io/js/deph-gauge)

_Returns depth of provided path(s), sync/async, cjs/mjs_

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
depthGauge('a/b/c');      // { path: 'a/b/c', depth: 3 }
depthGauge('./');         // { path: './', depth: 0 }
depthGauge('../../d/');   // { path: '../../d/', depth: -1 }
depthGauge('e\\f\\g');    // { path: 'e\\f\\g', depth: 3 }
depthGauge('\\h\\..\\i'); // { path: '\\h\\..\\i', depth: 1 }
```

**Multiple paths**

```js
const paths = [
    'a/b/c',
    './',
    '../../d/',
    'e\\f\\g',
    '\\h\\..\\i'
];

const options = { sort: 'ASC' };

const cb = (result, originalInput) => {
    console.log(result);
    console.log(originalInput);
}

depthGauge(paths, cb);
/*
console.log(result):
[
    { path: 'a/b/c', depth: 3 },
    { path: './', depth: 0 },
    { path: '../../d/', depth: -1 },
    { path: 'e\\f\\g', depth: 3 },
    { path: '\\h\\..\\i', depth: 1 }
]
console.log(originalInput):
[ 'a/b/c', './', '../../d/', 'e\\f\\g', '\\h\\..\\i' ]
*/

depthGauge(paths, options, cb);
/*
console.log(result):
[
    { path: '../../d/', depth: -1 },
    { path: './', depth: 0 },
    { path: '\\h\\..\\i', depth: 1 },
    { path: 'a/b/c', depth: 3 },
    { path: 'e\\f\\g', depth: 3 }
]
console.log(originalInput):
[ 'a/b/c', './', '../../d/', 'e\\f\\g', '\\h\\..\\i' ]
*/
```

### Usage: async

**Single path**

```js
// cjs syntac
depthGauge.async('a/b/c')
    .then(data => {
        // data = { path: 'a/b/c', depth: 3 }
    })
    .catch(error => console.log(error));
```

**Multiple paths**

```js
// mjs syntax

const paths = [
    'a/b/c',
    './',
    '../../d/',
    'e\\f\\g',
    '\\h\\..\\i'
];

const options = { sort: 'DESC' };

depthGaugeAsync(paths, options)
    .then(data => {
        /* data =
            [
                { path: 'a/b/c', depth: 3 },
                { path: 'e\\f\\g', depth: 3 },
                { path: '\\h\\..\\i', depth: 1 },
                { path: './', depth: 0 },
                { path: '../../d/', depth: -1 }
            ]
        */
    })
    .catch(error => console.log(error));
```

### Options

**`options.sort`**

Sorts result in ascending or descending order. Works for multiple paths.

Possible values: `'ASC'` | `'DESC'`

Default value: `undefined`

### callback(result, originalInput)

`callback` is a link to a callback function of synchronous call, that takes two arguments: `result` and `originalInput`.
