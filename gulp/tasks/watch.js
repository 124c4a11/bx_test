'use strict';

module.exports = function() {
  $.gulp.task('watch', function() {
    $.gulp.watch('./src/scss/**/*.scss', $.gulp.series('sass'));
    $.gulp.watch('./src/template/**/*.pug', $.gulp.series('pug'));
    $.gulp.watch('./src/sprites/png/*.png', $.gulp.series('sprite:png'));
    $.gulp.watch('./src/sprites/svg/*.svg', $.gulp.series('sprite:svg'));
    $.gulp.watch('./src/fonts/**/*.*', $.gulp.series('copy:fonts'));
    $.gulp.watch('./src/img/**/*.*', $.gulp.series('copy:image'));
  });
};
