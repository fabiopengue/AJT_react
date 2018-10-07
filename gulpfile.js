var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var SASS_SRC = './src/assets/sass/**/*.sass';
var CSS_DEST = './src/assets/css';
var BOOTSTRAP_SRC = 'node_modules/bootstrap/scss/bootstrap.scss';

gulp.task('sass', function(){

  gulp.src([BOOTSTRAP_SRC, SASS_SRC])
  .pipe(sass())
  .pipe(minifyCSS())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest(CSS_DEST));
});

gulp.task('watch', function(){
  gulp.watch([BOOTSTRAP_SRC, SASS_SRC], ['sass']);
});

gulp.task('default', ['watch']);
