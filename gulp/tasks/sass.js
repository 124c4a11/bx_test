'use strict';

module.exports = function() {
  $.gulp.task('sass', function() {
    return $.gulp.src('./src/scss/*.scss')
      .pipe($.gp.plumber ({
        errorHandler: $.gp.notify.onError(err => ({
          title: 'Style',
          message: err.message
        }))
      }))
      .pipe($.gp.if($.isDevelopment, $.gp.sourcemaps.init()))
      .pipe($.gp.sassGlob())
      .pipe($.gp.sass())
      .pipe($.gp.autoprefixer({ browsers: $.config.autoprefixerConfig }))
      .pipe($.gp.if($.isDevelopment, $.gp.sourcemaps.write()))
      .pipe($.gp.if(!$.isDevelopment, $.gp.csso()))
      .pipe($.gulp.dest($.config.root + '/styles'))
      .pipe($.browserSync.stream());
  })
};
