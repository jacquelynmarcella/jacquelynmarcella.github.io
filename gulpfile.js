var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');

gulp.task('sass', function(){
    return gulp.src('scss/style.scss')
      .pipe(sass()) // Using gulp-sass
      .pipe(gulp.dest('css'))
});

gulp.task('minify-css', () => {
    return gulp.src('css/*.css')
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(concat('style.min.css'))
      .pipe(gulp.dest('css/min'))
  });

gulp.task('watch', function(){
    gulp.watch('scss/*.scss',gulp.series(['sass', 'minify-css'])); 
});