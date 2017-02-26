'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();

var dst = {
    js: 'dist/js',
    css: 'dist/css',
    images: 'dist/images',
    fonts: 'dist/fonts'
};

var paths = {
    js: [],
    images: [],
    fonts: [],
    less: 'src/less/main.less',
    css: []
};

gulp.task('less', function () {
    return gulp.src(paths.less)
        .pipe(less({
            paths: [
                'node_modules'
            ]
        }))
        .pipe(gulp.dest(dst.css))
        .pipe(browserSync.stream());
});

gulp.task('serve', ['default'], function() {
    browserSync.init({
        server: {
            baseDir: "./",
            index: "index.html"
        }
    });

    gulp.watch(paths.less, ['less']);
});

gulp.task('clean', function() {
    return gulp.src('dist')
        .pipe(clean());
});

gulp.task('default', ['clean'], function() {
    return gulp.start('less');
});