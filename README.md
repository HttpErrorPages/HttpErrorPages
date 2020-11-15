[nginx](#nginx-integration) | 
[Apache HTTPD](#apache-httpd-integration) | 
[Lighttpd](#lighttpd-integration) | 
[express.js](#expressjs-integration) | 
[koa.js](#koajs-integration) | 
[Caddy](#caddy-integration) |
[Customization](#customization)

# Simple HttpErrorPages #
Simple HTTP Error Page Generator. Create a bunch of custom error pages - suitable to use with Lighttpd, Nginx, expressjs, koajs ,Apache-Httpd or any other Webserver.

![Screenshot](https://raw.githubusercontent.com/HttpErrorPages/HttpErrorPages/master/assets/screenshot1.png)

## Features ##

* Static pages (for webservers)
* Multi-Language (i18n) support
* Generator script to customize pages
* Native [express.js](http://expressjs.com/) middleware
* Native [koa.js](http://koajs.com/) middleware

## Demo ##
* [HTTP400](https://httperrorpages.github.io/HttpErrorPages/HTTP400.html)
* [HTTP401](https://httperrorpages.github.io/HttpErrorPages/HTTP401.html)
* [HTTP403](https://httperrorpages.github.io/HttpErrorPages/HTTP403.html)
* [HTTP404](https://httperrorpages.github.io/HttpErrorPages/HTTP404.html)
* [HTTP500](https://httperrorpages.github.io/HttpErrorPages/HTTP500.html)
* [HTTP501](https://httperrorpages.github.io/HttpErrorPages/HTTP501.html)
* [HTTP502](https://httperrorpages.github.io/HttpErrorPages/HTTP502.html)
* [HTTP503](https://httperrorpages.github.io/HttpErrorPages/HTTP503.html)
* [HTTP520](https://httperrorpages.github.io/HttpErrorPages/HTTP520.html)
* [HTTP521](https://httperrorpages.github.io/HttpErrorPages/HTTP521.html)

## Download ##
Just clone/download the git repository **or** use the prebuild packages (only the generated html files are included)

## Download Prebuild Packages (Pages only, en_US) ##

* [Download Single Files](https://github.com/HttpErrorPages/HttpErrorPages/tree/master/dist)

## NGINX Integration ##

[NGINX](http://nginx.org/en/docs/http/ngx_http_core_module.html#error_page) supports custom error-pages using multiple `error_page` directives.

File: [`default.conf`](https://www.nginx.com/resources/wiki/start/topics/examples/full/)

Example - assumes HttpErrorPages are located into `/var/ErrorPages/`.

```nginx
server {
    listen      80;
    server_name localhost;
    root        /var/www;
    index       index.html;
    
    location / {
        try_files $uri $uri/ =404;
        
        # add one directive for each http status code
        error_page 400 /ErrorPages/HTTP400.html;
        error_page 401 /ErrorPages/HTTP401.html;
        error_page 402 /ErrorPages/HTTP402.html;
        error_page 403 /ErrorPages/HTTP403.html;
        error_page 404 /ErrorPages/HTTP404.html;
        error_page 500 /ErrorPages/HTTP500.html;
        error_page 501 /ErrorPages/HTTP501.html;
        error_page 502 /ErrorPages/HTTP502.html;
        error_page 503 /ErrorPages/HTTP503.html;
    }

    # redirect the virtual ErrorPages path the real path
    location /ErrorPages/ {
        alias /var/ErrorPages/;
        internal;
    }
```

## Apache Httpd Integration ##
[Apache Httpd 2.x](http://httpd.apache.org/) supports custom error-pages using multiple [ErrorDocument](http://httpd.apache.org/docs/2.4/mod/core.html#errordocument) directives.

File: `httpd.conf` or `.htaccess`

Example - assumes HttpErrorPages are located into your **document root** `/var/www/...docroot../ErrorPages`.

```ApacheConf
ErrorDocument 400 /ErrorPages/HTTP400.html
ErrorDocument 401 /ErrorPages/HTTP401.html
ErrorDocument 403 /ErrorPages/HTTP403.html
ErrorDocument 404 /ErrorPages/HTTP404.html
ErrorDocument 500 /ErrorPages/HTTP500.html
ErrorDocument 501 /ErrorPages/HTTP501.html
ErrorDocument 502 /ErrorPages/HTTP502.html
ErrorDocument 503 /ErrorPages/HTTP503.html
```

## Lighttpd Integration ##

[Lighttpd](http://www.lighttpd.net/) supports custom error-pages using the [server.errorfile-prefix](http://redmine.lighttpd.net/projects/lighttpd/wiki/Server_errorfile-prefixDetails) directive.

File: `lighttpd.conf`

Example - assumes HttpErrorPages are located into `/var/www/ErrorPages/`.

```ApacheConf
server.errorfile-prefix = "/var/www/ErrorPages/HTTP"
```

## expressjs Integration ##

HttpErrorPages are available as NPM-Package - just install `http-error-pages` via **npm/yarn**

**Installation**

```terminal
yarn add http-error-pages
```

**Example**

A ready-to-use example can be found in [examples/express.js](examples/express.js)

```js
const _express = require('express');
const _webapp = _express();
const _httpErrorPages = require('http-error-pages');

async function bootstrap(){
    // demo handler
    _webapp.get('/', function(req, res){
        res.type('.txt').send('HttpErrorPages Demo');
    });

    // throw an 403 error
    _webapp.get('/my403error', function(req, res, next){
        const myError = new Error();
        myError.status = 403;
        next(myError);
    });

    // throw an internal error
    _webapp.get('/500', function(req, res){
        throw new Error('Server Error');
    });

    // use http error pages handler (final statement!)
    // because of the asynchronous file-loaders, wait until it has been executed
    await _httpErrorPages.express(_webapp, {
        lang: 'en_US',
        payload: {
            footer: 'Hello <strong>World</strong>',
            myvar: 'hello world'
        }
    });

    // start service
    _webapp.listen(8888);
}

// invoke bootstrap operation
bootstrap()
    .then(function(){
        console.log('Running Demo on Port 8888');
    })
    .catch(function(e){
        console.error(e);
    });
```

**Options**

Syntax: `Promise _httpErrorPages.express(expressWebapp [, options:Object])`

* `template` (type:string) - the path to a custom **EJS** template used to generate the pages. default [assets/template.ejs](assets/template.ejs)
* `css` (type:string) - the path to a precompiled **CSS** file injected into the page. default [assets/layout.css](assets/layout.css)
* `lang` (type:string) - language definition which should be used (available in the `i18n/` directory). default **en_US**
* `payload` (type:object) - additional variables available within the template
* `payload.footer` (type:string) - optional page footer content (html allowed). default **null**
* `filter` (type:function) - filter callback to manipulate the variables before populated within the template
* `onError` (type:function) - simple debug handler to print errors to the console (not to be used in production!)

## koajs Integration ##

HttpErrorPages are available as NPM-Package - just install `http-error-pages` via **npm/yarn**

**Installation**

```terminal
yarn add http-error-pages
```

**Example**

A ready-to-use example can be found in [examples/koa.js](examples/koa.js). 
Keep in mind that the following example has to be executed within an async context!

```js
const _koa = require('koa');
const _webapp = new _koa();
const _httpErrorPages = require('http-error-pages');

// use http error pages handler (INITIAL statement!)
// because of the asynchronous file-loaders, wait until it has been executed - it returns an async handler
_webapp.use(await _httpErrorPages.koa({
    lang: 'en_US',
    payload: {
        footer: 'Hello <strong>World</strong>',
        myvar: 'hello world'
    }
    
}));

// add other middleware handlers
_webapp.use(async (ctx, next) => {
    if (ctx.path == '/'){
        ctx.type = 'text';
        ctx.body = 'HttpErrorPages Demo';
    }else{
        return next();
    }
});

// start service
_webapp.listen(8888);
```

**Options**

Syntax: `Promise _httpErrorPages.koa([options:Object])`

* `template` (type:string) - the path to a custom **EJS** template used to generate the pages. default [assets/template.ejs](assets/template.ejs)
* `css` (type:string) - the path to a precompiled **CSS** file injected into the page. default [assets/layout.css](assets/layout.css)
* `lang` (type:string) - language definition which should be used (available in the `i18n/` directory). default **en_US**
* `payload` (type:object) - additional variables available within the template
* `payload.footer` (type:string) - optional page footer content (html allowed). default **null**
* `filter` (type:function) - filter callback to manipulate the variables before populated within the template
* `onError` (type:function) - simple debug handler to print errors to the console (not to be used in production!)

## Caddy Integration ##

[Caddy](https://caddyserver.com/docs/errors) supports custom error-pages using `errors` directive. 

File: Caddyfile

Example - assumes HttpErrorPages are located into `/var/www/error`.

```Caddyfile
www.yoursite.com {
    
    // Other configurations

    errors {
        404 /var/www/error/HTTP404.html
    }

    // Other configurations

}
```

## Customization ##

First of all, [clone](https://github.com/HttpErrorPages/HttpErrorPages.git) 
or [download](https://github.com/HttpErrorPages/HttpErrorPages/archive/master.zip) the http-error-pages repository.

### Install Dependencies ###

You have to install the node **dev** dependencies to build the pages:

```bash
# run the yarn command within the cloned repository
yarn install

# or if you more familiar with npm..
npm install
```

To customize the pages, you can edit any of the [template files](assets/) and **finally run the generator-script**.
All generated html files are located into the `dist/` directory by default.

If you wan't to add custom pages/additional error-codes, just put a new entry into the `i18n/pages-en_US.json` file (its recommended to copy the file). 
The generator-script will process each entry and generates an own page.

### Files ###

* [config.json](config.json) - basic configuration options
* [assets/layout.scss](assets/layout.scss) - the SCSS based styles
* [assets/template.ejs](assets/template.ejs) - the EJS based page template
* [i18n/pages-<lang>.json](i18n/) - the page definitions (multilanguage)
* [dist/*.html](dist/) - generator output directory

### Change page styles ###

To modify the page styles, just edit the SCSS based layout [assets/layout.scss](assets/layout.scss) and finally run **gulp** to generate the css code.
The new layout file is stored in [assets/layout.css](assets/layout.css) - run the page generator to create the pages.

**Example**

```bash
# start gulp sccs via npm
$ npm run gulp

> http-error-pages@0.6.0 gulp HttpErrorPages
> gulp

[08:40:33] Using gulpfile HttpErrorPages/gulpfile.js
[08:40:33] Starting 'sass'...
[08:40:34] Finished 'sass' after 108 ms
[08:40:34] Starting 'default'...
[08:40:34] Finished 'default' after 40 μs

# generate http-error-pages using modified stylesheet
$ npm run static

> http-error-pages@0.6.0 static HttpErrorPages
> node bin/generator.js static

Paths
 |- Config: HttpErrorPages/config.json
 |- Template: HttpErrorPages/assets/template.ejs
 |- Styles: HttpErrorPages/assets/layout.css
 |- Pages: HttpErrorPages/i18n/pages-en_US.json

Generating static pages
 |- Page <HTTP404.html>
 |- Page <HTTP403.html>
 |- Page <HTTP400.html>
 |- Page <HTTP500.html>
 |- Page <HTTP501.html>
 |- Page <HTTP502.html>
 |- Page <HTTP520.html>
 |- Page <HTTP503.html>
 |- Page <HTTP521.html>
 |- Page <HTTP533.html>
 |- Page <HTTP401.html>
Static files generated
```

### Multi language (i18n) ###

To use a different language just provide a custom [page definition](i18n/) - in case the file is located in `i18n` you can use the `--lang option`

**Example**
```terminal
$ npm run static -- --lang pt_BR

> http-error-pages@0.6.0 static HttpErrorPages
> node bin/generator.js static "--lang" "pt_BR"

Paths
 |- Config: HttpErrorPages/config.json
 |- Template: HttpErrorPages/assets/template.ejs
 |- Styles: HttpErrorPages/assets/layout.css
 |- Pages: HttpErrorPages/i18n/pages-pt_BR.json

Generating static pages
 |- Page <HTTP404.html>
 |- Page <HTTP400.html>
 |- Page <HTTP401.html>
 |- Page <HTTP403.html>
 |- Page <HTTP500.html>
 |- Page <HTTP501.html>
 |- Page <HTTP502.html>
 |- Page <HTTP520.html>
 |- Page <HTTP503.html>
 |- Page <HTTP521.html>
 |- Page <HTTP533.html>
Static files generated

```

### Add custom pages ###

Create custom error codes/pages used by e.g. CloudFlare

**Example**
```js
// webserver origin error
"520": {
    "title": "Origin Error - Unknown Host",
    "message": "The requested hostname is not routed. Use only hostnames to access resources."
},

// webserver down error
"521": {
    "title": "Webservice currently unavailable",
    "message": "We've got some trouble with our backend upstream cluster.\nOur service team has been dispatched to bring it back online."
},
```

### Change footer message ###

The footer message can easily be changed/removed by editing [config.json](config.json).

**Example - customm footer**

```js
{
    //  Output Filename Scheme - eg. HTTP500.html
    "scheme": "HTTP%code%.html",

    // Footer content (HTML Allowed)
    "footer": "Contact <a href=\"mailto:info@example.org\">info@example.org</a>"
}
```

**Example - no footer**

```js
{
    //  Output Filename Scheme - eg. HTTP500.html
    "scheme": "HTTP%code%.html"
}
```

### Placeholders/Variables ###

The following set of variables is exposed to the ejs template (404 page example):

```js
{
  title: 'Resource not found',
  message: 'The requested resource could not be found but may be available again in the future.',
  code: '404',
  language: 'en',
  scheme: 'HTTP%code%.html',
  pagetitle: "We've got some trouble | %code% - %title%",
  footer: 'Tech Contact <a href="mailto:info@example.org">info@example.org</a>',
  myvar: 'Hello World'
}
```

To generate dynamic titles/content based on the current variable set, each variable is exposed as `placeholder` (surrounded by `%`). 

You can also define custom variable within the page definitions, everything is merged togehter.

### Modify the HTML template ###

The HTML template is based on [ejs](https://github.com/mde/ejs) and located in [assets/template.ejs](assets/template.ejs) - you can apply any kind of changes.

```html
<!DOCTYPE html>
<html lang="<%= vars.language %>">
<head>
    <!-- Simple HttpErrorPages | MIT License | https://github.com/HttpErrorPages -->
    <meta charset="utf-8" /><meta http-equiv="X-UA-Compatible" content="IE=edge" /><meta name="viewport" content="width=device-width, initial-scale=1" />
    <title><%= vars.pagetitle %></title>
    <style type="text/css"><%- vars.inlinecss %></style>
</head>
<body>
    <div class="cover"><h1><%= vars.title %> <small><%= vars.code %></small></h1><p class="lead"><%= vars.message %></p></div>
    <% if (vars.footer){ %><footer><p><%- vars.footer %></p></footer><% } %>
</body>
</html>
```

### Command line options ###

The [http-error-pages generator](bin/generator.js) allows you to use custom template/config files directly. **This is the recommended method to create full-customized pages.**

```terminal
$ npm run static -- --help

> http-error-pages@0.6.0 static HttpErrorPages
> node bin/generator.js static "--help"

  Usage: static [options] [config]

  run http-error-pages generator

  Options:

    -t, --template <path>  path to your custom EJS template file
    -s, --styles <path>    path to your custom stylesheet (precompiled as CSS!)
    -p, --pages <path>     path to your custom page definition
    -l, --lang <lang>      the language of the default page definition
    -o, --out <path>       output directory
    -h, --help             output usage information
```

**Example - use custom files**

We assume you've created a folder named `example_org` which contains all relevant template files

```bash
# via npm run-script (cross platform)
$ npm run static -- -t example_org/template.ejs -s example_org/styles.css -p example_org/pages.json -o example_org/output

# .. or directly (linux only)
$ http-error-pages -t example_org/template.ejs -s example_org/styles.css -p example_org/pages.json -o example_org/output
```

## License ##
HttpErrorsPages is OpenSource and licensed under the Terms of [The MIT License (X11)](http://opensource.org/licenses/MIT) - your're welcome to contribute
