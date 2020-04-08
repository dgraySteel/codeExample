const { src, dest, watch, series } = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const replace = require('gulp-replace');

function defaultTask(done) {
    console.log("Hello, World!");
    done();
}
exports.default = defaultTask;

function uglifyTask() {
    return src('dist/app/**/*.js')
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(dest('build'));
}
exports.uglifyJS = uglifyTask;

function moveMapFiles() {
    return src('dist/app/*.js.map')
    .pipe(dest('build'))
}

function moveJSON() {
    return src('dist/app/**/*.json')
    .pipe(dest('build'))
}

function movePNG() {
    return src('dist/app/**/*.png')
    .pipe(dest('build'))
}

function moveHTML() {
    return (src('dist/app/**/*.html'))
    .pipe(src(['dist/app/index.html']))
    .pipe(replace('assets/leaflet-heat.js', 'leaflet-heat.min.js'))
    .pipe(replace('main.js', 'main.min.js'))
    .pipe(replace('polyfills.js', 'polyfills.min.js'))
    .pipe(replace('runtime.js', 'runtime.min.js'))
    .pipe(replace('styles.*js', 'styles.min.js'))
    .pipe(replace('vendor.js', 'vendor.min.js'))
    .pipe(dest('build'))
}

function moveCSS() {
    return (src('dist/app/**/*.css'))
    .pipe(dest('build'))
}

function moveDocuments() {
    return (src('dist/app/**/*.txt'))
    .pipe(dest('build'))
} 

function watcher() {
    watch('dist/app/**/*.js', series(uglifyTask, moveMapFiles, moveJSON, movePNG, moveHTML, moveCSS, moveDocuments));
}
exports.watch = watcher;

exports.release = series(uglifyTask, moveMapFiles, moveJSON, movePNG, moveHTML, moveCSS, moveDocuments);