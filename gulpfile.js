'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();

var dst = {
    js: 'dist/js',
    css: 'dist/css',
    images: 'dist/images',
    fonts: 'dist/fonts'
};

var paths = {
    js: [
        'node_modules/jquery/dist/jquery.js',
        'node_modules/bootstrap/dist/js/bootstrap.js',
        'src/js/app.js'
    ],
    images: [],
    fonts: [
        'node_modules/bootstrap/dist/fonts/*'
    ],
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

gulp.task('js', function () {
    return gulp.src(paths.js)
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dst.js))
        .pipe(browserSync.stream());
});

gulp.task('fonts', function () {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest(dst.fonts));
});

gulp.task('serve', ['default'], function() {
    browserSync.init({
        server: {
            baseDir: "./",
            index: "index.html"
        }
    });

    gulp.watch('src/less/**/*.less', ['less']);
});

gulp.task('clean', function() {
    return gulp.src('dist')
        .pipe(clean());
});

gulp.task('default', ['clean'], function() {
    return gulp.start('less', 'js', 'fonts');
});