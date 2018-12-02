const gulp = require("gulp");
const brSync = require("browser-sync");//Подключаем Browser Sync
const scss = require("gulp-sass");
const concat = require("gulp-concat");//Подключаем gulp-concat (для конкатенации файлов)
const uglify = require("gulp-uglify");//Подключаем gulp-uglifyjs (для сжатия JS)
const del = require("del");//Подключаем библиотеку для удаления файлов и папок
const autoprefixer = require('gulp-autoprefixer');//
const useref = require('gulp-useref');//
const gulpIf = require('gulp-if');//
const cleanCSS = require('gulp-clean-css');//plugin to minify CSS
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const sequence = require('run-sequence');


/* For develop */

//For SCSS to CSS
gulp.task("scss",()=>{
	return gulp.src('app/scss/main.scss')
			.pipe(scss())
			.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
			.pipe(gulp.dest("app/css"))
			.pipe(brSync.reload({stream:true}));//Чтобы Browser Sync мог вставлять новые стили в страницу браузера (обновлять CSS)
});
//Live reload Browser Sync
gulp.task("serve",()=>{
	return brSync.init({
		server: {
            baseDir: "./app"
        },
		notify:false
	});
});
//JS libraries
gulp.task("scripts",()=>{
	return gulp.src([
		"app/libs/jquery.min.js",
		"app/libs/jquery-ui.min.js",
		"app/libs/jquery.ui.touch-punch.min.js"
		])
		.pipe(concat('libs.min.js')) //Собираем JS в кучу в новом файле libs.min.js
		.pipe(uglify()) //Сжимаем JS файл
		.pipe(gulp.dest("app/js")); //Выгружаем в папку app/js
});
//For watching
//чтобы наш CSS был самой новой версии, необходимо, чтобы scss запускался перед watch 'serve','scss','scripts'
gulp.task("watch-project",['serve','scss','scripts'],()=>{//
	gulp.watch('app/scss/*.scss',['scss']);
	gulp.watch("app/*.html").on("change",brSync.reload);
	gulp.watch("app/js/*.js",brSync.reload);
});
//Default task
gulp.task('default',['watch-project']);


/* For production */
//Images
gulp.task("images",()=>{
	return gulp.src("app/img/**/*.+(png|jpeg|jpg|gif|svg)")
		.pipe(cache(imagemin([
			imagemin.gifsicle({interlaced: true}),
			imagemin.jpegtran({progressive: true}),
			imagemin.optipng({optimizationLevel: 5}),
			imagemin.svgo({
				plugins: [
					{removeViewBox: true},
					{cleanupIDs: false}
				]
			})
		])))
		.pipe(gulp.dest("dist/img"));
});
//Combine JS and CSS from HTML TAG head then put to 'dist'
gulp.task('scriptsProd',()=>{
	return gulp.src('app/*.html')
			.pipe(useref())
			.pipe(gulpIf('*.js',babel({//From ES 6 to ES 5
					presets: ['@babel/env']
					})
				)	
			)
			.pipe(gulpIf('*.js',uglify()))//If JS - shrink it
			.pipe(gulpIf('*.css',cleanCSS({compatibility: 'ie8'})))//If CSS - shrink it
			.pipe(gulp.dest('dist'));
});
//------Total cleaning------
//Clear cache, that we used for images
gulp.task('clear',()=>
    cache.clearAll()
);
//Delete 'dist' folder before cache will be removed
gulp.task('destroy',()=>{ 
	return del.sync('dist'); 
});
//Let's cleaning full distribution
gulp.task('clean',(callback)=>{ 
	return sequence('destroy','clear',callback); 
});

//In the gulpfile we want to clean out the contents of the 'dist' folder before running our build
//--------Leave images after cleaning------
gulp.task('clean:dist', function(){
	return del(['dist/**/*', '!dist/img', '!dist/img/**/*']);
});
//Let's make a distribution
gulp.task("dist",(callback)=>{//['clean','scriptsProd',"images"],
	return sequence('clean:dist',['scriptsProd',"images"],callback);
});