'use strict';

import path from 'path';

import Render from './render';

export default (config_path) => {
  config_path = path.resolve(module.parent.filename, '..',  config_path);

  let config = require(config_path);
  let entry = config.entry;
  if(entry === undefined) {
    throw new Error('You do not set "entry"');
  }

  let output = []; 
  for(let name in entry) {
    if(entry[name] instanceof Object) {
      output.push(Render(name, entry[name].path, entry[name].options, config_path));
    }
    else {
      throw new Error("You need to set name as 'Object'");
    }
  }

  return output;
};
