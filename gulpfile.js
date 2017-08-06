'use strict';

global.$ = {
  package: require('./package.json'),
  config: require('./gulp/config'),
  paths: {
    task: require('./gulp/paths/tasks.js'),
    cssVendor: require('./gulp/paths/css.vendor.js')
  },
  gulp: require('gulp'),
  gulplog: require('gulplog'),
  del: require('del'),
  path: require('path'),
  browserSync: require('browser-sync').create(),
  webpackStream: require('webpack-stream-fixed'),
  named: require('vinyl-named'),
  isDevelopment: !process.env.NODE_ENV || process.env.NODE_ENV == 'development',
  gp: require('gulp-load-plugins')(),
};

$.paths.task.forEach(function(taskPath) {
  require(taskPath)();
});

$.gulp.task('default', $.gulp.series(
  'clean',
  $.gulp.parallel(
    'pug',
    'sass',
    'css:vendor',
    'sprite:png',
    'copy:image',
    'copy:pics',
    'copy:fonts',
    'sprite:svg',
    'js:webpack'
  ),
  $.gulp.parallel(
    'watch',
    'serve'
  )
));
