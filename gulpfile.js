var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
plugins.minifyCSS = require('gulp-minify-css'); // does not autoload
plugins.gulpif = require('gulp-if'); // does not autoload
var lazypipe = require('lazypipe');

function endsWith(str, suffix) {
	return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

//
// compile scss files and emit normal version + source map and a
// minified version
//
gulp.task('sass', function () {
	gulp.src('css/*.scss')
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.sass())
		.pipe(plugins.colorguard())
		.pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1'))
		.pipe(plugins.sourcemaps.write('.'))
		.pipe(gulp.dest('content/themes/dev/assets/css'))
		.pipe(plugins.minifyCSS())
		.pipe(plugins.rename({suffix: '.min'}))
		.pipe(gulp.dest('content/themes/dev/assets/css'))
		.pipe(plugins.livereload({ auto: false }));
});

//
// concat all javascript files to site.js
//
gulp.task('js', function () {
	gulp.src('js/*.js')
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.concat('site.js'))
		.pipe(plugins.sourcemaps.write('.'))
		.pipe(gulp.dest('content/themes/dev/assets/js'))
		.pipe(plugins.livereload({ auto: false }));
});


//
// copy handlebars theme files over
//
gulp.task('templates_livereload', function() {
	var embed_live_reload = lazypipe()
		.pipe(plugins.rename, function (path) {
				path.extname = ".html";
			}
		)
		.pipe(plugins.embedlr)
		.pipe(plugins.rename, function (path) {
				path.extname = ".hbs";
			}
		);

	gulp.src('templates/**/*.hbs')
		.pipe(plugins.gulpif(function (file) {
				return endsWith(file.path, "default.hbs");
			}, embed_live_reload()
		))
		.pipe(gulp.dest('content/themes/dev/'))
		.pipe(plugins.livereload({ auto: false }));
});

gulp.task('templates', function() {
	gulp.src('templates/**/*.hbs')
		.pipe(gulp.dest('content/themes/dev/'))
		.pipe(plugins.livereload({ auto: false }));
});

//
// copy stuff over
//
gulp.task('stuff', function() {
	gulp.src('stuff/*')
		.pipe(gulp.dest('content/themes/dev/'))
		.pipe(plugins.livereload({ auto: false }));
});

//
// copy font files over
//
gulp.task('fonts', function() {
	gulp.src('fonts/*.{eot,svg,ttf,woff,otf}')
		.pipe(gulp.dest('content/themes/dev/assets/fonts'))
		.pipe(plugins.livereload({ auto: false }));
});


//
// just run a live reload server and watch files for changes
//
gulp.task('livereload', ['sass', 'js', 'templates_livereload', 'fonts', 'stuff'], function() {
	plugins.livereload.listen();

	gulp.watch('css/*.scss', ['sass']);
	gulp.watch('templates/**/*.hbs', ['templates_livereload']);
	gulp.watch('fonts/*.{eot,svg,ttf,woff,otf}', ['fonts']);
	gulp.watch('stuff/*', ['stuff']);
	gulp.watch('js/*.js', ['js']);

	var ghost = require('ghost');
	process.env.NODE_ENV = 'development';
	ghost({ config: __dirname + '/ghost-config.js' }).then(function (ghostServer) {
		ghostServer.start();
	});
});

gulp.task('dist', ['default'], function() {
	gulp.src('content/themes/dev/**/*')
		.pipe(plugins.gulpif(function (file) {
				return !endsWith(file.path, ".map");
			}, plugins.zip('dev-theme.zip')
		))
		.pipe(gulp.dest('.'));
});

//
// default task, compile everything
//
gulp.task('default', ['sass', 'js', 'templates', 'fonts', 'stuff']);