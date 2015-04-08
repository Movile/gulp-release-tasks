var fs = require('fs');
var git = require('gulp-git');
var bump = require('gulp-bump');
var filter = require('gulp-filter');
var tag_version = require('gulp-tag-version');
var _ = require('lodash');

module.exports = function (options, gulp) {

    options = _.defaults({
        filesToBump: [ './package.json', './bower.json' ],
        referenceFile: './package.json',
        destination: './',
        version: null,
        releaseType: 'patch',
        commitMessage: '[Release] Bump project version'
    }, options);

    gulp.task('tag', ['bump', 'commit'], function () {
        return gulp.src(options.filesToBump)
            .pipe(filter(options.referenceFile))
            .pipe(tag_version())
            .pipe(git.push('origin', 'master', {
                args: '--tags'
            }));
    });

    gulp.task('add', function () {
        return gulp.src(options.filesToBump)
            .pipe(git.add());
    });

    gulp.task('commit', ['add'], function () {
        return gulp.src(options.destination)
            .pipe(git.commit(options.commitMessage));
    });

    gulp.task('bump', function () {
        return gulp.src(options.filesToBump)
            .pipe(bump({
                type: options.releaseType
            }))
            .pipe(gulp.dest(options.destination));
    });
};