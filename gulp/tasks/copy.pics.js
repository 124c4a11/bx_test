'use strict';

module.exports = function() {
  $.gulp.task('copy:pics', function() {
    return $.gulp.src('./src/pics/**/*.*')
      .pipe($.gp.imagemin())
      .pipe($.gulp.dest($.config.root + '/pics'));
  });
};
