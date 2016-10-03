var gulp = require('gulp');
var concat = require('gulp-concat');
var ngmin = require('gulp-ngmin');

var files = "./js/*.js";
 
gulp.task('dist', function() {
	gulp.src(files)
		.pipe(concat('./dist.js'))
		.pipe(gulp.dest('./dist'));
});

gulp.task('compress', function () {
    gulp.src('.dist/dist.js')
        .pipe(ngmin({dynamic: true}))
        .pipe(gulp.dest('dist'));
});
 
gulp.task('default', function() {
	gulp.run('dist', 'compress');
	gulp.watch(files, function(evt) {
		gulp.run('dist', 'compress');
	});
});

