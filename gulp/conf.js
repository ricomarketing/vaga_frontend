const gutil = require('gulp-util');


exports.paths = {
  src: 'src',
  dist: 'dist',
  tmp: '.tmp',
  e2e: 'e2e'
};
exports.wiredep = {
  exclude: [/jquery/],
  directory: 'bower_components',
  overrides: {
    "chart.js": {
      "main": ["dist/Chart.min.js"]
    }
  }
};

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function(title) {
  'use strict';

  return function(err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
};
