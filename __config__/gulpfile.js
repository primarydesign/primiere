const lazy = require('lazy-req')(require);
const dreq = require('require-dir');
const gulp = require('gulp');
const gif = require('gulp-if');
const browsersync = require('browser-sync');

const Primiere = require('./');
const $ = Primiere.paths;
const _ = Primiere.options;
const Browser = browsersync.create();

const data = lazy('gulp-data');
const named = lazy('vinyl-named');
const nunjucks = lazy('gulp-nunjucks-render');
const postcss = lazy('gulp-postcss');
const pretty = lazy('gulp-pretty-url');
const webpack = lazy('webpack-stream');

/**
 * Pages
 */
gulp.task('pages', function() {
	let enabled = Boolean(Primiere.configs.enableTemplating);
	gulp.src($.pages.views)
	.pipe(gif(enabled, data()(_.data(Primiere))))
	.pipe(gif(enabled, nunjucks()(_.nunjucks($))))
	.pipe(pretty()())
	.pipe(gulp.dest($.pages.dest))
	.pipe(Browser.stream());
});
/**
 * Styles
 */
gulp.task('styles', function() {
	return gulp.src($.styles.entries)
	.pipe(postcss()(_.postcss))
	.pipe(gulp.dest($.styles.dest))
	.pipe(Browser.stream());
});
/**
 * Scripts
 */
gulp.task('scripts', function() {
	return gulp.src($.scripts.entries)
	.pipe(named()())
	.pipe(webpack()(_.webpack))
	.pipe(gulp.dest($.scripts.dest))
	.pipe(Browser.stream());
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
gulp.task('serve', function() {
	Browser.init(_.browsersync(Primiere));
});
/**
 * Watch
 */
gulp.task('watch', function() {});