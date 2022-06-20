/* ***** ----------------------------------------------- ***** **
/* ***** Gulp - SVGs
/* ***** ----------------------------------------------- ***** */

import config from '../config';
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import rename from 'gulp-rename';

/*
** -- Optimize SVG files
** -- Create SVG sprite
*/
const svgs = () => {
  return gulp.src(config.svgs.src)
    .pipe(imagemin())
    .pipe(rename({
      prefix : 'svg-',
      extname : '.php'
    }))
    .pipe(gulp.dest(config.svgs.dest));
}

export default svgs;
