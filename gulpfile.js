// Gulp Dependencies
var gulp = require('gulp');

// Requires the gulp-sass plugin
var sass = require('gulp-sass');

// Sync with the browser
var browserSync = require('browser-sync').create();

// concatinate the js files
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');

// Cleaning up generated files automatically
var del = require('del');

// JSDoc 
var jsdoc = require('gulp-jsdoc3');

// To run tasks in sequence
var runSequence = require('run-sequence');

gulp.task('hello', function() {
  console.log('Hello Zell');
});


gulp.task('sass', function(){
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Gulp watch syntax
gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']); 
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload); 
});

// Changes Sync with browser
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});


gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('dist'))
});

gulp.task('clean:dist', function() {
  return del.sync('dist');
});

gulp.task('cache:clear', function (callback) {
return cache.clearAll(callback)
});

gulp.task('build', ['clean', 'sass', 'useref'], function (){
  console.log('Building files');
});

gulp.task('build', function (callback) {
  runSequence('clean:dist', 
    ['sass', 'useref'],
    callback
  )
});

gulp.task('default', function (callback) {
  runSequence(['sass','browserSync', 'watch'],
    callback
  )
});

gulp.task('doc', function (cb) {
    gulp.src(['README.md', './app/js/**/*.js'], {read: false})
        .pipe(jsdoc(cb));
});