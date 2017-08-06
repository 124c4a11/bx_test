'use strict';

module.exports = function() {
  $.gulp.task('sprite:png', function () {
      var spriteData = $.gulp.src('./src/sprites/png/**/*.png').pipe($.gp.spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.scss',
        cssFormat: 'css',
        imgPath: '../img',
        padding: 70
      }));

      spriteData.img.pipe($.gulp.dest('src/img'));
      return spriteData.css.pipe($.gulp.dest('src/scss/common'));
  });
};