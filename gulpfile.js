// скрипт для галпа 4 версии

const { src, dest, watch } = require('gulp'), // стандартные функции от галпа src, dest, watch 
  //rename = require('gulp-rename'),
  //cssnano = require('gulp-cssnano'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  browserSync = require('browser-sync').create();
/*
function minCSS() {
  return src('src/css/style.css')
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(dest('src/css'))
}
*/
function serveSass() { // делает из sass css
  return src('src/sass/**/*.{scss,sass}')
      .pipe(sass())  // запускаем плагин "sass"
      .pipe(autoprefixer({cascade: false}))
      .pipe(dest('src/css')) // выгружаем это всё в папку css
      .pipe(browserSync.stream()); // функция при помощи которой обновляются sass файлы (перезагружается страница)
}

function bs() { // браузер синк должен включаться после того, как скомпилятся sass afqks
  serveSass(); // компилируем sass файлы 
  browserSync.init({
    server: {            // запускает локальный сервер
        baseDir: "src"
    }
  });   // и начинает отслеживать изменения
  watch('src/*.html').on('change', browserSync.reload);
  watch('src/sass/**/*.{scss,sass}', serveSass);  // все sass файлы и в подпапках тоже (**)
  watch('src/js/**/*.js').on('change', browserSync.reload);
}


//exports.minCSS = minCSS;
exports.serve = bs;