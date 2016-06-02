# React html render

## Install

```
  npm install react-html-render
```

## Write config

- default: `render.config.js`
- example:
```
var path = require('path');

module.exports = { 
  entry: {
    "index": {
       path: path.join(__filename, './../base.pug'),
       options: {
         "context": {path: path.join(__filename, "./../../lib/component"), props: {id: "1"}}
       }   
     }   
  },  
  output: {
    filename: "[name].html",
    path: path.join(__filename, "./../")
  }
};
```

- Every object in `entry` will generate a `html` file.
- Every object in `entry`:
    - path -> the path of `pug` file (If you do not know what is `pug`, you can see [here](https://github.com/pugjs/pug)). If you do not set a path, this object will just combine every object in `options`.
    - options -> the options of `pug` file. If you want to use react component, you need to write an object which have `path`, the path of react component. If you need to use `props`, you just need to add `props` in object.
- `output`:
    - filename -> filename is the name for output file and `[name]` will be replaced with the key of every object in `entry`. `defulat: [name].html`
    - path -> the path for output files. `default: the same path as render.config.js`

## Usage in command

```
  $(npm bin)/render
```

- Use other config:
```
  $(npm bin)/render --config render.config.js
```

## Usage in file

```
var render = require('react-html-render');

var output = render('./render.config.js');
console.log(output);
```
- You just give a path to `react-html-render` function.
