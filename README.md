gulp-release-tasks
=========

global release tasks for use with gulp, to make your life easier :beer:

## Usage
`npm install gulp-release-tasks --save-dev`

```javascript
// add to gulpfile.js
// tasks will be registered via global context
require('gulp-release-tasks');
```

run `gulp -T` for a list of available commands

bumps the versions of your `package.json` and `bower.json`

### tagging
task             | version
-----------------|-------------------------------------
gulp tag         | v0.0.1 -> v0.0.2 + commit + tag + push
gulp tag --minor | v0.0.1 -> v0.1.0 + commit + tag + push
gulp tag --major | v0.0.1 -> v1.0.1 + commit + tag + push

### bumping
task             | version
--------------   |-----------------
gulp bump        | v0.0.1 -> v0.0.2
gulp bump --minor| v0.0.1 -> v0.1.0
gulp bump --major| v0.0.1 -> v1.0.1

### optional flags
- in some cases, you may want to limit versioning to a single file
  - `gulp tag --bower` will ignore your package.json, and only augment the version for your `bower.json`
  - `gulp tag --npm`   will ignore your bower.json, and only augment the version for your `package.json`



## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

![x](http://i.imgur.com/ydTgw5e.gif)
