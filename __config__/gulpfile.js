const lazy = require('lazy-req')(require);
const dreq = require('require-dir');
const gulp = require('gulp');
const gif = require('gulp-if');

const Primiere = require('./');
const $ = Primiere.paths;
const _ = Primiere.options;

const data = lazy('gulp-data');
const named = lazy('vinyl-named');
const postcss = lazy('gulp-postcss');
const webpack = lazy('webpack-stream');
const nunjucks = lazy('gulp-nunjucks-render');

/**
 * Pages
 */
gulp.task('pages', function() {
	let enabled = Boolean(Primiere.configs.enableTemplating);
	gulp.src($.pages.views)
	.pipe(gif(enabled, data()(_.data(Primiere))))
	.pipe(gif(enabled, nunjucks()(_.nunjucks($))))
	.pipe(gulp.dest($.pages.dest));
});
/**
 * Styles
 */
gulp.task('styles', function() {
	return gulp.src($.styles.entries)
	.pipe(postcss()(_.postcss))
	.pipe(gulp.dest($.styles.dest));
});
/**
 * Scripts
 */
gulp.task('scripts', function() {
	return gulp.src($.scripts.entries)
	.pipe(named()())
	.pipe(webpack()(_.webpack))
	.pipe(gulp.dest($.scripts.dest));
});
/**
 * Images
 */
gulp.task('images', function() {});
/**
 * Assets
 */
gulp.task('assets', function() {});
/**
 * Build
 */
gulp.task('build', function() {});
/**
 * Serve
 */
gulp.task('serve', function() {});
/**
 * Watch
 */
gulp.task('watch', function() {});