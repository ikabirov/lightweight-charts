const gulp = require('gulp');
const path = require('path');
const exec = require('child_process').exec;
const closureCompiler = require('google-closure-compiler').gulp();

function getCompilerSettings() {
	return {
		entry_point: path.join(__dirname, 'tsickle-output/src/standalone.js'),
		js: [
			path.join(__dirname, 'tsickle-output/src/**.js'),
		],
		compilation_level: 'ADVANCED',
		warning_level: 'VERBOSE',
		language_in: 'ECMASCRIPT_NEXT',
		language_out: 'ECMASCRIPT5_STRICT',
		rewrite_polyfills: false,
		externs: ['tsickle-output/externs.js'],
		js_output_file: 'standalone.js',
	};
}

gulp.task('generate-js', (cb) => {
	exec(`tsickle --externs tsickle-output/externs.js -- --outDir ${path.resolve('./tsickle-output')}`, cb);
});

gulp.task('default', ['generate-js'], () => closureCompiler(
	getCompilerSettings()
)
	.src() // needed to force the plugin to run without gulp.src
	.pipe(gulp.dest('dist')));
