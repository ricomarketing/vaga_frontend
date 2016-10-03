var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');

gulp.task('sass', function(callback) {
  return gulp.src('sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('css'));
  cb(err);
});

gulp.task('concat-js', function() {
  return gulp.src([
      'bower_components/angular/angular.min.js',
      'bower_components/angularjs-slider/dist/rzslider.min.js',
      'js/*.js'
    ])
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('concat-css', function() {
  return gulp.src([
      'bower_components/angularjs-slider/dist/rzslider.min.css',
      'css/*.css'
    ])
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch('sass/*.scss', ['sass']);
  gulp.watch('css/*.css', ['concat-css']);
  gulp.watch('js/*.js', ['concat-js']);
});

gulp.task('default', function(callback) {
  runSequence('sass', ['concat-js', 'concat-css'], callback);
});
