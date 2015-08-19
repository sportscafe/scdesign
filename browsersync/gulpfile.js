'use strict';  /* jslint node: true */

var gulp = require('gulp');
var browserSync = require('browser-sync');
//var nodemon = require('gulp-nodemon');
//var sass = require('gulp-sass');

//gulp.task('default', ['browser-sync'], function() {});

gulp.task('default', ['browser-sync']);

//gulp.task('sass:watch', function () {
//  console.log("Starting sass-watch.");
//  gulp.watch('./design/scss/**/*.scss', ['sass']);
//});

//gulp.task('sass', function () {
// gulp.src(['./design/scss/**/*.scss'])
//  .pipe(sass.sync().on('error', sass.logError))
//   .pipe(gulp.dest('./design/css/'));
//});

gulp.task('browser-sync', function() {
  console.log("Starting browser-sync.");
  browserSync.init(require('./browser-sync-config.js'));
});
