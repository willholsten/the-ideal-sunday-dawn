
'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');
const changed = require('gulp-changed');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const uglify = require('gulp-uglify');
const scssLint = require('gulp-scss-lint');
// const sass = require("gulp-sass")(require("dart-sass"));
var sass = require('gulp-dart-sass');
const clean = require('gulp-clean-css');
const themeKit = require('@shopify/themekit');

/** Asset paths **/
const srcSCSS  = './src/scss/**/*.scss';
const srcJS = './src/js/**/*.js';
const srcIMAGES = './src/images/**';
const srcFONTS  = './src/fonts/**';

/** SCSSS Task **/
  gulp.task('scss', function() {
    return gulp.src('./src/scss/theme.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ cascade : false }))
    .pipe(clean( { compatibility: 'ie11' }))
    .pipe(gulp.dest('assets'))
});
   

/** JS Task **/
const jsFiles = [
    './node_modules/babel-polyfill/dist/polyfill.js',
    './src/js/plugins/swiper.min.js',
    './src/js/sections/announcement-bar.js'
];

gulp.task('js', function() {
    return gulp.src(jsFiles)
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(concat('theme.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets'))
});

/** Images Task **/
 gulp.task('images', () => {
    return gulp.src(srcIMAGES)
        .pipe(changed('assets')) // ignore unchanged files
        .pipe(gulp.dest('assets'))
});

/** Fonts task */
 gulp.task('fonts', () => {
    return gulp.src(srcFONTS)
        .pipe(changed('assets')) // ignore unchanged files
        .pipe(gulp.dest('assets'))
});

gulp.task('watch', function() {
    gulp.watch(srcSCSS, gulp.series('scss'));
    gulp.watch(srcJS, gulp.series('js'));
    gulp.watch('images/*.{jpg,jpeg,png,gif,svg}', gulp.series('images'));
    gulp.watch('./src/fonts/**/*.{eot,svg,ttf,woff,woff2}', gulp.series('fonts'));
    themeKit.command('watch', {
        allowLive: true,
        env: 'development'
    })
});