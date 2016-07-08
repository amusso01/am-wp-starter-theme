/* ***** ----------------------------------------------- ***** **
/* ***** Gulp - Styles
/* ***** ----------------------------------------------- ***** */

// Require all development dependencies
var autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync'),
	cleanCSS = require('gulp-clean-css'),
	config = require('../config'),
	gif = require('gulp-if'),
	gulp = require('gulp'),
	gutil = require('gulp-util'),
	header = require('gulp-header'),
	plumber = require('gulp-plumber'),
	postcss = require('gulp-postcss'),
	rename = require('gulp-rename'),
	reporter = require('postcss-reporter'),
	sass = require('gulp-sass'),
	scss = require('postcss-scss'),
	size = require('gulp-size'),
	sourcemaps = require('gulp-sourcemaps'),
	stylelint = require('stylelint'),
	isProduction = !!gutil.env.production;

/*
** -- Lint scss files with Stylelint
** -- Create sourcemaps if in development mode (use --production to disable soucemaps)
** -- Compile scss files
** -- Autoprefix necessary properties
** -- Minify
** -- Add ByMattLee header to bundled file
** -- Print bundled file size
** -- Inject styles into page
*/
gulp.task('styles', function () {

	return gulp.src(config.styles.src)
		.pipe(plumber())
		.pipe(
			postcss([
				stylelint(),
				reporter({
					clearMessages: true
				})
			], {
				syntax: scss 
			})
		)
		.pipe(gif(!isProduction, sourcemaps.init()))
			.pipe(sass().on('error', sass.logError))
			.pipe(autoprefixer({
				browsers: ['last 2 versions'],
				cascade: false
			}))
			.pipe(cleanCSS())
			.pipe(rename({
				suffix: '.min'
			}))
			.pipe(header(config.fileHeader.join('\n')))
			.pipe(size({
				title: 'Compressed File Size:',
				showFiles: true
			}))
		.pipe(gif(!isProduction, sourcemaps.write('./')))
		.pipe(gulp.dest(config.styles.dest))
		.pipe(browserSync.stream({
			match: '**/*.css'
		}));

});
