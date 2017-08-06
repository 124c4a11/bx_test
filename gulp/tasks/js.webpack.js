'use strict';

module.exports = function() {
  let firstBuildReady = false;

  function done(err, stats) {
    firstBuildReady = true;

    if (err) { // hard error, see https://webpack.github.io/docs/node.js-api.html#error-handling
      return;  // emit('error', err) in webpack-stream
    }

    $.gulplog[stats.hasErrors() ? 'error' : 'info'](stats.toString({
      colors: true
    }));
  }

  $.gulp.task('js:webpack', function(callback) {
    let options = {
      output: {
        publicPath: '/js/',
        filename: '[name].js',
        library: '[name]'
      },
      watch: $.isDevelopment,
      devtool: $.isDevelopment ? 'cheap-module-inline-source-map' : null,
      module: {
        loaders: [{
          test:    /\.js$/,
          include: $.path.join(__dirname, '../../src/js'),
          loader:  'babel-loader',
          query: {
            presets: ['es2015']
          }
        }]
      },
      plugins: [
        new $.webpackStream.webpack.NoErrorsPlugin(),
        new $.webpackStream.webpack.optimize.CommonsChunkPlugin({
          name: 'common',
          minChunks: 2
        }),
        // Global variables
        new $.webpackStream.webpack.ProvidePlugin({
          // fix jQuery plugins
          $: "jquery",
          jQuery: "jquery",
          "window.jQuery": "jquery"
        })
      ]
    };

    return $.gulp.src($.config.sources + '/js/*.js')
        .pipe($.gp.plumber({
          errorHandler: $.gp.notify.onError(err => ({
            title: 'Webpack',
            message: err.message
          }))
        }))
        .pipe($.named())
        .pipe($.webpackStream(options, null, done))
        .pipe($.gp.if(!$.isDevelopment, $.gp.uglify()))
        .pipe($.gulp.dest($.config.root + '/js'))
        .on('data', () => {
          if (firstBuildReady) {
            callback();
          }
        });
  })
};