const gulp = require('gulp');
const ts = require('gulp-typescript');
var nodemon = require('gulp-nodemon');
var env = require('gulp-env');

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');

const jsFiles = ['dist/**/*.js'];

// Tell gulp-typescript to transpile our project and deliver it to “dist”
gulp.task('transpile', () => {
	const tsResult = tsProject.src()
		.pipe(tsProject());
	return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('watch', ['transpile'], () => {
	gulp.watch('src/**/*.ts', ['transpile']);
});

gulp.task('serve', ['transpile', 'watch'], function() {
	nodemon({
		script: 'dist/index.js',
		watch: jsFiles
	})
});