'use strict';

import path from 'path';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import pug from 'pug';

export default (name, pug_path, pug_options, config_path) => {
  let output = {
    "name": name
  };

  if(pug_options === undefined) {
    let str = "No options to render \"" + name + "\".";
    throw new Error(str);
  }

  for(let key in pug_options) { 
    if(pug_options[key] instanceof Object) { 

      if(pug_options[key].path !== undefined) {
        let component_path = path.resolve(config_path, "..", pug_options[key].path);
        let Component = require(component_path).default;
        if(Component === undefined) Component = require(component_path);
        let props = pug_options[key].props === undefined ? null : pug_options[key].props;

        pug_options[key] = renderToStaticMarkup(React.createElement(Component, props));
      }

    }
  }

  if(pug_path === undefined) {
    let html = "";
    for(let key in pug_options) {
      html += "<div id=\"" + key + "\">" + pug_options[key] + "</div>";
    }
    output["html"] = html;
  }
  else {
    pug_path = path.resolve(config_path, "..", pug_path);
    let html = pug.renderFile(pug_path, pug_options);
    output["html"] = html;
  }

  return output;
};
