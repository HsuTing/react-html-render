# React html render

You can use this to generate a `html` file with `react` component or output a `html` using `react server side rendering`.

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
  ./node_modules/.bin/renderHTML
```

- Use other config:
```
  ./node_modules/.bin/renderHTML --config render.config.js
```

## Usage in file

```
  var path = require('path');
  var process = require('process');
  var render = require('react-html-render');

  var output = render(path.join(process.cwd(), '..', './render.config.js'));
  console.log(output);
```
- You just need to give a path of `react.config.js` to `react-html-render` function.
