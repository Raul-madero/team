const {src, dest, watch, parallel} = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const cache = require('gulp-cache');
const avif = require('gulp-avif');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
function css(done) {
    src('./src/scss/**/*.scss') //Identificar el archivo de sass
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass()) //Compilar archivo de sass
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./build/css')); //Almacenar en el disco duro
    done();
};
function imagenes(done) {
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{jpg, png}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('./build/img'))
    done();
}
function versionWebp(done) {
    const opciones = {
        quality: 50
    }
    src('src/img/**/*.{jpg, png}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))
    done()
}
function dev(done) {
    watch('src/scss/**/*.scss', css);
    done()
}
function versionAvif(done) {
    const opciones = {
        quality: 50
    }
    src('src/img/**/*.{jpg, png}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))
    done()
}
function dev(done) {
    watch('src/scss/**/*.scss', css);
    done()
}
exports.css = css;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.imagenes = imagenes;
exports.dev = parallel(versionWebp, versionAvif, dev, imagenes);