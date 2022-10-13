const { src, dest, parallel, gulp, watch, series } = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const cssbeautify = require('gulp-cssbeautify');
const browserSync = require('browser-sync');
const uglify = require('gulp-uglifyjs');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const fs = require('fs');
const csscomb = require('gulp-csscomb');
const svgSprite = require('gulp-svg-sprites');
const svgstore = require('gulp-svgstore');
const listing = require('gulp-listing');
const gcmq = require('gulp-group-css-media-queries');
const babel = require('gulp-babel');
const webp = require('gulp-webp');

var autoprefixerList = [
    'Chrome >= 45',
    'Firefox ESR',
    'Edge >= 12',
    'Explorer >= 10',
    'iOS >= 9',
    'Safari >= 9',
    'Android >= 4.4',
    'Opera >= 30',
];

function webpConvert() {
    return src('app/images/**/*.{png,jpg,jpeg}').pipe(webp()).pipe(dest('app/images/webp'));
}

function browser_sync() {
    browserSync({
        server: {
            baseDir: 'app/',
        },
        notify: false,
    });
}

function pages() {
    return src('app/page/*.pug')
        .pipe(
            pug({
                pretty: true,
            }),
        )
        .pipe(dest('app/'))
        .pipe(browserSync.reload({ stream: true }));
}

function pagesBlocks() {
    return src('app/blocks/**/*.pug')
        .pipe(
            pug({
                pretty: true,
            }),
        )
        .pipe(dest('app/blocks'))
        .pipe(browserSync.reload({ stream: true }));
}

function clear(pages) {
    return del.sync(pages);
}

function scss() {
    return src('app/scss/**/*.scss')
        .pipe(sass())
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['last 2 versions'],
                cascade: false,
            }),
        )
        .pipe(gcmq())
        .pipe(csscomb())
        .pipe(cssbeautify())
        .pipe(dest('app/style'))
        .pipe(browserSync.reload({ stream: true }));
}

function css_libs() {
    parallel('scss');
    return src([
        'app/libs/bootstrap/dist/css/bootstrap.css',
        'app/libs/swiper/swiper-bundle.css',
        'app/libs/sweetalert2/dist/sweetalert2.min.css'
    ])
        .pipe(concat('libs.min.css'))
        .pipe(cssnano())
        .pipe(dest('app/style'));
}

function scripts_build() {
    return src(['app/js/hed_fot/head.js', 'app/blocks/**/*.js', 'app/js/hed_fot/footer.js'])
        .pipe(concat('script.js'))
        .pipe(
            babel({
                presets: ['@babel/env'],
            }),
        )
        .pipe(dest('app/js'))
        .pipe(browserSync.reload({ stream: true }));
}

function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.js',
        'app/libs/bootstrap/dist/js/bootstrap.js',
        'app/libs/jQuery-Mask-Plugin/dist/jquery.mask.min.js',
        'app/libs/swiper/swiper-bundle.js'

    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'));
}

function svgSprites() {
    return (
        src('app/images/sprites/intermediate-svg/*.svg')
            .pipe(
                svgstore({
                    prefix: 'icon-',
                }),
            )
            // .pipe(cheerio({
            // 	parserOptions: { xmlMode: true }
            // }))
            .pipe(rename('sprite.svg'))
            .pipe(dest('app/images/sprites'))
    );
}

function watchFiles() {
    watch('app/page/**/*', pages);
    watch('app/blocks/**/*.pug', pages);
    watch('app/scss/**/*', scss);
    watch('app/blocks/**/*.scss', scss);
    watch('app/js/*.js');
}

//Вывод файлов на продакшн
function build() {
    buildCss = src(['app/style/*.css']).pipe(dest('dist/style'));

    buildfavicon = src(['app/favicon/**/*']).pipe(dest('dist/favicon'));

    buildFonts = src('app/fonts/**/*').pipe(dest('dist/fonts'));

    buildImages = src('app/images/**/*').pipe(dest('dist/images'));

    buildJs = src('app/js/**/*.js').pipe(dest('dist/js'));

    buildHtml = src('app/*.html').pipe(dest('dist'));
}

function listing_file() {
    return src('app/*.html').pipe(listing('index.html')).pipe(dest('app/'));
}

exports.scripts = scripts;
exports.scripts_build = scripts_build;
exports.scss = scss;
exports.pages = pages;
exports.browser_sync = browser_sync;
exports.css_libs = css_libs;
exports.watchFiles = watchFiles;
exports.webpConvert = webpConvert;
exports.pagesBlocks = pagesBlocks;

exports.svgSprites = svgSprites;
exports.listing_file = listing_file;
exports.default = parallel(watchFiles, scripts, css_libs, browser_sync);
exports.build = build;
exports.product = series(parallel(pages, scripts, scss, css_libs), build);
