const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const image = require('gulp-image');


gulp.task('sass', () => {
    return gulp.src([
           'source/scss/*.scss'
    ])
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('public/dist/css'))
    .pipe(browserSync.stream());
});


gulp.task('serve', ['sass'] ,() =>  {
    browserSync.init({
        server: './public'
    });

    gulp.watch([
        'source/scss/*.scss'
    ], ['sass']);

    gulp.watch('public/*.html').on('change', browserSync.reload);
    gulp.watch('source/scss/*.scss').on('change', browserSync.reload);

});

gulp.task('image', function () {
    gulp.src('source/images/*')
      .pipe(image())
      .pipe(gulp.dest('public/dist/images'));
      gulp.watch('source/images/*', ['image'])
  });

  gulp.task('default', ['serve', 'image']);