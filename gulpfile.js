var gulp = require('gulp'),
    webpackFrontendConfig = require('./webpack.config.js'),
    webpack = require('webpack'),
    webpackDevServer = require('webpack-dev-server'),
    eslint = require('gulp-eslint'),
    onBuild = function (done) {
        return function (err, stats) {
            if (err) {
                console.error('Error', err);
            }
            else {
                console.info(stats.toString());
            }

            if (done) {
                done();
            }
        }
    },
    karmaServer = require('karma').Server;

gulp.task('frontend-watch', function () {
    webpack(webpackFrontendConfig).watch(100, onBuild());
});

gulp.task('lint', function() {
    return gulp.src(['./app/assets/dev/**/*.js','!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('test', function (done) {
    new karmaServer({
        configFile: __dirname + '/karma.config.js'
    }, done).start();
});

gulp.task('watch', ['frontend-watch']);
