'use strict';

import fs from 'fs';
import path from 'path';
import process from 'process';

import Render from './../render';

const base_path = process.cwd();

let config_path_flag = false;
let config_path = path.resolve(base_path, './render.config.js');

process.argv.forEach((val, index, array) => {
  if(index === 0 || index === 1) return;

  if(val === "--config") {
    config_path_flag = true;
    return;
  }
  if(config_path_flag) {
    config_path = path.resolve(base_path, val);
    config_path_flag = false;
    return;
  }
});

let config = require(config_path);
let entry = config.entry;
if(entry === undefined) {
  throw new Error('You do not set "entry"');
}

let output_setting;
if(config.output === undefined) {
  output_setting = {
    filename: "[name].html",
    path: path.resolve(config_path, '..')
  };
}
else {
  output_setting = {
    filename: config.output.filename === undefined ? "[name].html" : config.output.filename,
    path: config.output.path === undefined ? path.resolve(config_path, '..') : path.resolve(config_path, '..', config.output.path)
  }
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

console.log();
for(let index in output) {
  let name = output[index].name;
  let html = output[index].html;
  let filename = (
    output_setting.filename.indexOf("[name]") !== -1 ?
    output_setting.filename.replace("[name]", name) :
    name + output_setting.filename
  );
  let output_path = path.resolve(config_path, '..', output_setting.path, filename);

  fs.writeFile(output_path, html, (err) => {
    if (err) return console.log(err);

    console.log(filename + " success!");
    console.log("--> " + output_path);
    console.log();
  });
}
