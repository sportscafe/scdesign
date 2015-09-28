'use strict';

var del = require('del');
var path = require('path');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')(); //useful for lazy loading
var runSequence = require('run-sequence'); //stop-gap measure until gulp4.0 is released https://www.npmjs.com/package/run-sequence
var webserver = require('gulp-webserver');
var gutil = require('gulp-util');

var basePaths = {
	src: 'pages/',
	dest: 'build/'
};
var sassGlob = basePaths.src + '**/*.scss';
var htmlGlob = basePaths.src + '**/*.html';
var imagesGlob = [basePaths.src + '**/*.jpg', basePaths.src + '**/*.png', basePaths.src + '**/*.svg'];

gulp.task('default', function() {
	console.log('Usage: gulp [clean|build|start]');
});

gulp.task('clean', function (cb) {
	//del() needs cb() for synchrounous execution (instead of return like gulp.src())
	del([
    'build/'
  ], cb());
});

gulp.task('build', function(cb) {
	runSequence(['sass', 'html', 'images'], cb);
});

gulp.task('watch', ['build', 'start'], function() {
	//plugins.livereload.listen();
	gulp.watch(sassGlob, ['sass']);
	gulp.watch(htmlGlob, ['htmlWaitReload']);
	gulp.watch(imagesGlob, ['imagesWaitReload']);
});

gulp.task('start', ['build'], function () {
	gulp.src('./')
    .pipe(webserver({
			host: '0.0.0.0',
      livereload: true,
      directoryListing: {
        enable: true,
        path: '.'
				}
    }));
});

gulp.task('sass', function() {
	return gulp.src(sassGlob)
		.pipe(plugins.sass.sync().on('error', plugins.sass.logError))
		.pipe(plugins.autoprefixer({browsers: ['> 5%', 'last 1 version']}))
		.pipe(gulp.dest(basePaths.dest))
		.pipe(plugins.livereload());
});

gulp.task('html', function(cb) {
	return gulp.src(htmlGlob)
		.pipe(gulp.dest(basePaths.dest));
});

gulp.task('images', function() {
	return gulp.src(imagesGlob)
		.pipe(gulp.dest(basePaths.dest))
		.pipe(plugins.livereload());
});

//sass ideally would have only one file as output
//so no need to make sass's livereload wait
gulp.task('htmlWaitReload', ['html'], function(cb) {
		plugins.livereload.reload();
		console.log('html livereload triggered!');
		cb();
});

gulp.task('imagesWaitReload', ['images'], function(cb) {
		plugins.livereload.reload();
		console.log('images livereload triggered!');
		cb();
});
