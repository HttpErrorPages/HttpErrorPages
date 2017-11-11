const _gulp = require('gulp');
const _sass = require('gulp-sass');
const _prettyError = require('gulp-prettyerror');
const _cleanCSS = require('gulp-clean-css');
const _concat = require('gulp-concat-util');

_gulp.task('default', ['sass']);
 
_gulp.task('sass', function (){
    return _gulp.src('./assets/layout.scss')
        .pipe(_prettyError())
        .pipe(_sass())

        .pipe(_cleanCSS({compatibility: 'ie10'}))
        .pipe(_concat('layout.css'))

        .pipe(_gulp.dest('./assets'));
});
 