const lazy = require('lazy-req')(require);
const dreq = require('require-dir');
const gulp = require('gulp');
const gif = require('gulp-if');
const browsersync = require('browser-sync');

const Primiere = require('./');
const $ = Primiere.paths;
const _ = Primiere.options;
const Browser = browsersync.create();

const del = lazy('del');
const commence = lazy('run-sequence');
const data = lazy('gulp-data');
const imagemin = lazy('gulp-imagemin');
const named = lazy('vinyl-named');
const nunjucks = lazy('gulp-nunjucks-render');
const postcss = lazy('gulp-postcss');
const pretty = lazy('gulp-pretty-url');
const webpack = lazy('webpack-stream');
const yargs = lazy('yargs');

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
gulp.task('images', function() {
	return gulp.src($.images.files)
	.pipe(imagemin()(_.imagemin))
	.pipe(gulp.dest($.images.dest))
	.pipe(Browser.stream());
});
/**
 * Assets
 */
gulp.task('assets', function() {
	return gulp.src($.assets.files)
	.pipe(gulp.dest($.assets.dest));
});
/**
 * Build
 */
gulp.task('build', function() {
	del()(_.delete($)).then(function() {
		commence()(['pages','styles','scripts','images','assets']);
	});
});
/**
 * Serve
 */
gulp.task('serve', function() {
	Browser.init(_.browsersync(Primiere));
});
/**
 * Watch
 */
gulp.task('watch', function() {
	if (yargs().argv.s) {
		commence()(['serve']);
	}
	gulp.watch($.pages.watch, ['pages']);
	gulp.watch($.styles.watch, ['styles']);
	gulp.watch($.scripts.watch, ['scripts']);
	gulp.watch($.images.watch, ['images']);
	gulp.watch($.assets.watch, ['assets']);
});