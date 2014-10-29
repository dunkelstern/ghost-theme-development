var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
plugins.minifyCSS = require('gulp-minify-css'); // does not autoload
plugins.server = require('gulp-server-livereload'); // does not autoload
plugins.gulpif = require('gulp-if'); // does not autoload

// wether you want to use the socket.io based livereload (phonegap!)
//
// if this is false a livereload snippet is embedded into all generated
// HTML files for serving by any webserver you want to use. Just start
// the livereload watcher: gulp livereload
//
// if this is set to true then no livereload snippet is embedded and the
// "serve" task uses it's internal socket.io based live reload.
var socket_io_livereload = false;

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
		.pipe(gulp.dest('build/css'))
		.pipe(plugins.minifyCSS())
		.pipe(plugins.rename({suffix: '.min'}))
		.pipe(gulp.dest('build/css'))
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
		.pipe(gulp.dest('build/js'))
		.pipe(plugins.livereload({ auto: false }));
});

//
// compile handlebars template files with mock-data into html for
// live preview
//
gulp.task('handlebars', function () {
	gulp.src('templates/*.hbs')
		.pipe(plugins.consolidate("handlebars", function(file) {
			try {
				var mock = require(file.path + '.mockdata.json');
				return mock;
			} catch (ex) {
				return {};
			}
		}))
		.pipe(plugins.rename(function (path) {
			path.extname = ".html";
			})
		)
		.pipe(plugins.gulpif((socket_io_livereload == false), plugins.embedlr()))
		.pipe(gulp.dest("build"))
		.pipe(plugins.livereload({ auto: false }));
})

//
// run a local webserver with livereload support to serve the build
// directory
//
gulp.task('serve', function() {
	var server_config = {
		open: true,
		defaultFile: 'index.html'
	};

	if (socket_io_livereload == false) {
		console.log("Using normal livereload");
		plugins.livereload.listen()
		gulp.watch('css/*.scss', ['sass']);
		gulp.watch('templates/*.hbs', ['handlebars']);
		server_config.livereload = false;
	} else {
		console.log("Using socket.io livereload");
		server_config.livereload = true;
	}

	gulp.src('build')
		.pipe(plugins.server(server_config));

});

//
// just run a live reload server and watch files for changes
//
gulp.task('livereload', function() {
	plugins.livereload.listen()
	gulp.watch('css/*.scss', ['sass']);
	gulp.watch('templates/*.hbs', ['handlebars']);
});

//
// default task, compile everything
//
gulp.task('default', ['sass', 'js', 'handlebars']);