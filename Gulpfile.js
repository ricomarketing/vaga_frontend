var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass');

gulp.task('default', function() {
    // scripts
    gulp.src([
            './app/src/scripts/rico.js',
            './app/src/scripts/config.js',
            './app/src/scripts/utils.js',
            './app/src/scripts/search.js',
            './app/src/scripts/chart.js',
            './app/src/scripts/angular.js'
        ])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./app/js'));
    // styles
    gulp.src('./app/src/styles/*.scss')
        .pipe(concat('app.css'))
        .pipe(sass())
        .pipe(gulp.dest('./app/css'));
});
