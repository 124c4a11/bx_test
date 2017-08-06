'use strict';

module.exports = function() {
  $.gulp.task('copy:image', function() {
    return $.gulp.src('./src/images/**/*.*')
      .pipe($.gp.imagemin())
      .pipe($.gulp.dest($.config.root + '/images'));
  });
};
