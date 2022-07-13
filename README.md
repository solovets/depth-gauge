# Depth-gauge

_Returns depth of provided path(s)_

### Install

```
npm i depth-gauge
```

### Usage: basic

After defining `path-gauge` in your script:

```js
const depth = require('depth-gauge');
```

you can use `depth-gauge` asynchronously:

```js
depth(paths [, options])
    .then(data => console.log(data))
    .catch(error => console.log(':-('))
```

or synchronously:

```js
const myDepths = depth.sync(paths [, options, callback]);
```

### Usage: async

**Single path**

```js
const depth = require('depth-gauge');

depth('a/b/c')
    .then(data => {
        console.log(data);
        // => 3
    })
    .catch(error => console.log('ooops'));
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

depth(paths)
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

### Usage: sync

```js
const depth = require('depth-gauge');

function cb() {
    console.log('Great!');
}

const var1 = depth.sync('a/b/c');
// var1 = 3

const var2 = depth.sync(['a/b/c', './']);
// var2 = [{path: 'a/b/c', depth: 3}, {path: './', depth: 0}]

const var3 = depth.sync(['a/b/c', './'], cb);
// => Great!
// var3 = [{path: 'a/b/c', depth: 3}, {path: './', depth: 0}]
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

depth(paths, {
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
    .catch(error => console.log('ooops'));
```

### callback(result, originalInput)

`callback` is a link to a callback function, that takes two arguments: `result` and `originalInput`.

```js
const depth = require('depth-gauge');

function cb(result, originalInput) {
    console.log('Result:', result);
    console.log('Original input:', originalInput);
}

const var4 = depth.sync(['\\h\\..\\i', '../../d/'], cb);
// => Result: [{path: '\\h\\..\\i', depth: 1}, {path: '../../d/', depth: -1}]
// => Original input: ['\\h\\..\\i', '../../d/']
// var4 = [{path: '\\h\\..\\i', depth: 1}, {path: '../../d/', depth: -1}]

const var5 = depth.sync(['\\h\\..\\i', '../../d/'], {sort: 'ASC'}, cb);
// => Result: [{path: '../../d/', depth: -1}, {path: '\\h\\..\\i', depth: 1}]
// => Original input: ['\\h\\..\\i', '../../d/']
// var5 = [{path: '../../d/', depth: -1}, {path: '\\h\\..\\i', depth: 1}]
```
