const lazy = require('lazy-req')(require);
const dreq = require('require-dir');
const gulp = require('gulp');

const Primiere = require('./');
const $ = Primiere.configs;
const _ = Primiere.options;

const postcss = lazy('gulp-postcss');

/**
 * Pages
 */
gulp.task('pages', function() {});
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
gulp.task('scripts', function() {});
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