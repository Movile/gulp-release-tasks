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
        commitMessage: '[Release] Bump project version',
        tagMessage: '[Release] Create release tag: %VERSION%'
        versionPrefix: ''
    }, options);

    gulp.task('tag', ['bump', 'commit'], function () {
        return gulp.src(options.filesToBump)
            .pipe(filter(options.referenceFile))
            .pipe(tag_version({
                prefix: options.prefix,
                message: options.tagMessage
            }))
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
                version: options.version,
                type: options.releaseType
            }))
            .pipe(gulp.dest(options.destination));
    });
};