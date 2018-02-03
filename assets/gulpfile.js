// ============================= REQUIRES =====================================
var gulp = require('gulp'),
    connect = require('gulp-connect'), //Server for livereload;
    concat = require('gulp-concat'), //Creating output file
    typescript = require('gulp-typescript'), //TypeScript - scripts
    sass = require('gulp-sass'), //SASS - styles
    wait = require('gulp-wait'); //Insert dealy between pipes

// ============================= VARIABLES ====================================
var paths = ['typings/**/*.d.ts', 'src/**/*.ts'],
    //Target style file name
    targetScriptFileName = 'app.js',
    //Target style location
    targetScriptLocationPath = 'dist/scripts',
    //Paths to template files
    stylesPaths = ['styles/**/*.scss']
    //Target style file name
    targetStyleFileName = 'main.css',
    //Target style location
    targetStyleLocationPath = 'dist/styles';

var tsProject = typescript.createProject({
        declarationFiles: false
    });

// ============================== TASKS =======================================
gulp.task('default', defaultTask);
gulp.task('dev', ['server', 'watch'], devTask);
gulp.task('server', serverTask);
gulp.task('watch', watchTask);
gulp.task('ts', tsTask);
gulp.task('sass', sassTask);

// ============================= FUNCTIONS ====================================
function defaultTask(done) {
    console.log('\nTask default is empty. See gulpfile.js\n');
    done();
}

function devTask() {
    console.log('\nTask dev has been run.\n');
}

function serverTask() {
    connect.server({
        root: ['dist'],
        livereload: true
    });

    console.log('\nTask server has been run.\n');
}

function watchTask() {
    gulp.watch(paths, ['ts']);
    gulp.watch(stylesPaths, ['sass']);

    console.log('\nTask watch has been run.\n');
}

function tsTask() {
    connect.reload();
    console.log('\nTask ts has been run.\n');
}

function tsTask() {
    return gulp.src(paths)
            .pipe(tsProject())
            .pipe(concat(targetScriptFileName))
            .pipe(gulp.dest(targetScriptLocationPath))
            .pipe(connect.reload());
}

function sassTask() {
    return gulp.src(stylesPaths)
            .pipe(wait(500))
            .pipe(sass().on('error', sass.logError))
            .pipe(concat(targetStyleFileName))
            .pipe(gulp.dest(targetStyleLocationPath))
            .pipe(connect.reload());
}
