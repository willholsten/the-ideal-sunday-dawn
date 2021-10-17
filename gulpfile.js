
const gulp = require('gulp');
const babel = require('gulp-babel');
const changed = require('gulp-changed');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

const sass = require("gulp-sass")(require("dart-sass"));
const clean = require('gulp-clean-css');
const themeKit = require('@shopify/themekit');

/** Asset paths **/
 const srcJS = 'js/*.js'; 

/** SCSSS Task **/
gulp.task('sass', function() {
    return gulp.src('scss/global.scss')
    .pipe(sass())
    .pipe(clean( { compatibility: 'ie11' }))
    .pipe(gulp.dest('assets'))
});

/** JS Task **/
 const jsFiles = [
    srcJS
];

gulp.task('js', function() {
    return gulp.src(jsFiles)
        .pipe(concat('scripts.js'))
        .pipe(rename('theme.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./assets/'));
});

/** Images Task **/
 gulp.task('images', () => {
    return gulp.src('images/**')
        .pipe(changed('./assets/')) // ignore unchanged files
        .pipe(gulp.dest('./assets/'))
});

gulp.task('watch', function() {
    gulp.watch('scss/*.scss', gulp.series('sass'));
    gulp.watch(srcJS, gulp.series('js'));
    gulp.watch('images/*.{jpg,jpeg,png,gif,svg}', gulp.series('images'));
    themeKit.command('watch', {
        allowLive: true,
        env: 'development'
    })
});