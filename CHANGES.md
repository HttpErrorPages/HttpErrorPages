CHANGELOG
======================================================

Branch 3.X.X
------------------------------------------------------

### 3.1.0 ###

* Added: exposed `express.js` response object within `filter()` callback


### 3.0.0 ###

* Refactored the whole codebase
* Added: template support for `pagetitle` (automatically set if not defined)
* Added: option to set the pagetitle directly via `payload.pagetitle` (koa+expressjs)
* Added: filter function to dynamically manipulate the errordata object (koa+expressjs)
* Added: support for additional variables/payloads
* Added: support for placeholders to static page generator
* Added: iso-639-1 `language` attribute (derived from page lang)
* Added: error/exception object available via `error` (koa+expressjs)
* Added: `onError` callback as debug error handler (not to be used in production)
* Changed: moved `footer` content into `payload` object
* Changed: all variables within the `ejs` template are only accessible via `vars` object

Branch 2.X.X
------------------------------------------------------

### 2.0.1 ###
* Bugfix: gulp4 compatibility

### 2.0.0 ###
* Added [koa](http://koajs.com/) support
* Added support for multiple http frameworks
* Changed: **express.js** error handler is encapsulated within the `express()` function
* Changed: moved middleware example to `examples/`

Branch 1.X.X
------------------------------------------------------

### 1.0.0 ###
* New Generator/Build System: [EJS](https://github.com/mde/ejs) (templates), [SCSS](http://sass-lang.com/) (styles) and [GULP](https://gulpjs.com/) (build) are used as a replacement of the historical php/bash/ant/less setup.
* New express.js integration/middleware (full asynchronous operation)
* JSON based page definitions including **i18n** support
* Option to use custom styles
* Option to use custom template
* Changed: middleware API (express.js)
* Changed: generator script is based on **javascript**

Preliminary
------------------------------------------------------

### 0.5.2 ###
* Bugfix: package.json contains invalid main/app entry file

### 0.5.1 ###
* Bugfix: `lib/` directory was not included in the npm package

### 0.5.0 ###
* Added: expressjs support with native npm package/error handler

### 0.4.1 ###
* Bugfix: Restored NGINX Configuration from 0331dac487caa0b3ddb5897b5d35afc2c01dfbd5
* Added: Semantic Versioning

### 0.4 ###
* Added: **ANT** based build file
* Added: Configuration file `config.ini`
* Added: Prebuild Packages (includes all generated html file)
* Changed the directory structure
* Demo Pages are hosted via GitHub Pages (located within the `docs/` dir)

### 0.3 ###
* Replaced Bootstrap by small inline styles
* Added optional footer contact address
* PHP template (`template.phtml`) is used instead of simple text based template