// sample: how to autoload your models

var fs        = require('fs')
  , path      = require('path')
  // , lodash    = require('lodash')

fs .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  })
  .forEach(function(file) {
    // model setup  
  });
