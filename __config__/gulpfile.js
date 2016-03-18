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
const htmlmin = lazy('gulp-htmlmin');
const imagemin = lazy('gulp-imagemin');
const named = lazy('vinyl-named');
const nunjucks = lazy('gulp-nunjucks-render');
const postcss = lazy('gulp-postcss');
const pretty = lazy('gulp-pretty-url');
const replace = lazy('gulp-replace');
const webpack = lazy('webpack-stream');
const yargs = lazy('yargs');

/**
 * Pages
 * Renders the compiled HTML, if templating is enabled, and minifies the output.
 */
gulp.task('pages', function() {
	let enabled = Boolean(Primiere.configs.enableTemplating);
	gulp.src($.pages.views)
	.pipe(gif(enabled, data()(_.data(Primiere))))
	.pipe(gif(enabled, nunjucks()(_.nunjucks($))))
	.pipe(pretty()())
	.pipe(replace()(/\$site/g, Primiere.envars.root))
	.pipe(htmlmin()(_.htmlmin))
	.pipe(gulp.dest($.pages.dest))
	.pipe(Browser.stream());
});
/**
 * Styles
 * Runs entry stylesheets through PostCSS and minifies the output.
 */
gulp.task('styles', function() {
	return gulp.src($.styles.entries)
	.pipe(postcss()(_.postcss))
	.pipe(replace()(/\$site/g, Primiere.envars.root))
	.pipe(gulp.dest($.styles.dest))
	.pipe(Browser.stream());
});
/**
 * Scripts
 * Runs entry entry scripts through Webpack, transpiles ES2015, and minified output.
 */
gulp.task('scripts', function() {
	return gulp.src($.scripts.entries)
	.pipe(named()())
	.pipe(webpack()(_.webpack))
	.pipe(replace()(/\$site/g, Primiere.envars.root))
	.pipe(gulp.dest($.scripts.dest))
	.pipe(Browser.stream());
});
/**
 * Images
 * Compresses images.
 */
gulp.task('images', function() {
	return gulp.src($.images.files)
	.pipe(imagemin()(_.imagemin))
	.pipe(gulp.dest($.images.dest))
	.pipe(Browser.stream());
});
/**
 * Assets
 * Moves assets to build.
 */
gulp.task('assets', function() {
	return gulp.src($.assets.files)
	.pipe(gulp.dest($.assets.dest));
});
/**
 * Build
 * Runs all compilation tasks.
 * @flag fresh - Trashes the build directory rebuilding.
 */
gulp.task('build', function() {
	del()(_.delete($)).then(function() {
		commence()(['pages','styles','scripts','images','assets']);
	});
});
/**
 * Serve
 * Initializes a local development server.
 * @flag open|o - open index in default browser
 */
gulp.task('serve', function() {
	Browser.init(_.browsersync(Primiere));
});
/**
 * Watch
 * Initialize watchers to detect changes and call a given task.
 * @flag s - run the serve task as well
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
