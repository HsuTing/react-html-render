'use strict';

var path = require('path');
var render = require('./../lib/index').default;

var output = render('./render.config.js');
console.log(output);
