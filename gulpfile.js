var gulp = require('gulp');
var releaseTasks = require('./loader');
var minimist = require('minimist');

var flags = minimist(process.argv.slice(2), {
    string: [ 'type', 'prefix' ],
    default: {
        type: 'patch',
        prefix: ''
    }
});

releaseTasks({
    versionPrefix: flags.prefix,
    releaseType: flags.type,
    filesToBump: [ './package.json' ]
}, gulp);
