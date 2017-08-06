'use strict';

module.exports = function() {
  $.gulp.task('pug', function() {
    return $.gulp.src('./src/template/pages/*.pug')
      .pipe($.gp.plumber({errorHandler: $.gp.notify.onError(function(err) {
        return {
          title: 'Pug',
          message: err.message
        }
      })}))
      .pipe($.gp.pug({ pretty: true }))
      .pipe($.gulp.dest($.config.root));
  });
};
