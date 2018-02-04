CHANGELOG
======================================================

Version 2.X.X
------------------------------------------------------
* Added [koa](http://koajs.com/) support
* Added support for multiple http frameworks
* Changed: **express.js** error handler is encapsulated within the `express()` function
* Changed: moved middleware example to `examples/`

Version 1.X.X
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