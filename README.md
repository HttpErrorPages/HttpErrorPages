# Simple HttpErrorPages #
Simple HTTP Error Page Generator. Create a bunch of custom error pages - suitable to use with Lighttpd, Nginx, Apache-Httpd or any other Webserver.

![Screenshot](https://raw.githubusercontent.com/AndiDittrich/HttpErrorPages/master/assets/screenshot1.png)

## Demo ##
* [HTTP400](https://andidittrich.github.io/HttpErrorPages/HTTP400.html)
* [HTTP401](https://andidittrich.github.io/HttpErrorPages/HTTP401.html)
* [HTTP403](https://andidittrich.github.io/HttpErrorPages/HTTP403.html)
* [HTTP404](https://andidittrich.github.io/HttpErrorPages/HTTP404.html)
* [HTTP500](https://andidittrich.github.io/HttpErrorPages/HTTP500.html)
* [HTTP501](https://andidittrich.github.io/HttpErrorPages/HTTP501.html)
* [HTTP502](https://andidittrich.github.io/HttpErrorPages/HTTP502.html)
* [HTTP503](https://andidittrich.github.io/HttpErrorPages/HTTP503.html)
* [HTTP520](https://andidittrich.github.io/HttpErrorPages/HTTP520.html)
* [HTTP521](https://andidittrich.github.io/HttpErrorPages/HTTP521.html)

## Download ##
Just clone/download the git repository **or** use the prebuild packages (only the generated html files are included)

## Download Prebuild Packages (Pages only) ##

**Direct Download**
* [Download TAR Archive](https://raw.githubusercontent.com/AndiDittrich/HttpErrorPages/master/dist/pages.tar)
* [Download ZIP Archive](https://raw.githubusercontent.com/AndiDittrich/HttpErrorPages/master/dist/pages.zip)

**Shell/Bash**
```shell
# TAR Archive
wget https://raw.githubusercontent.com/AndiDittrich/HttpErrorPages/master/dist/pages.tar

# ZIP Archive
wget https://raw.githubusercontent.com/AndiDittrich/HttpErrorPages/master/dist/pages.zip
```

## NGINX Integration ##

[NGINX](http://nginx.org/en/docs/http/ngx_http_core_module.html#error_page) supports custom error-pages using multiple `error_page` directives.

File: [`default.conf`](https://www.nginx.com/resources/wiki/start/topics/examples/full/)

Example - assumes HttpErrorPages are located into `/var/www/ErrorPages/`.

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
        alias /var/www/ErrorPages/;
        internal;
    }
```

## expressjs Integration ##

HttpErrorPages are available as NPM-Package - just install `http-error-pages` via **npm/yarn**

```terminal
npm install http-error-pages --save
```

Example

```js
var _express = require('express');
var _webapp = _express();
var _httpErrorPages = require('http-error-pages');

// demo handler
_webapp.get('/', function(req, res){
    res.type('.txt').send('HttpErrorPages Demo');
});

// throw an 403 error
_webapp.get('/my403error', function(req, res, next){
    var myError = new Error();
    myError.status = 403;
    next(myError);
});

// use http error pages handler (final statement!)
_httpErrorPages(_webapp);

// start service
_webapp.listen(8888);
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

## Customization ##
To customize the pages, you can edit the **template.phtml** file and add your own styles. Finally run the generator-script.
If you wan't to add custom pages/additional error-codes, just put a new entry into the `pages.php` file. The generator-script will process each entry and generates an own page.

#### Custom Page Example (pages.php) ####

Custom Error-Codes used by e.g. CloudFlare

```php
// webserver origin error
'520' => array(
    'title' => 'Origin Error - Unknown Host',
    'message' => 'The requested hostname is not routed. Use only hostnames to access resources.'
),

// webserver down error
'521' => array (
    'title' => 'Webservice currently unavailable',
    'message' => "We've got some trouble with our backend upstream cluster.\nOur service team has been dispatched to bring it back online."
)
```

### Build/Generator ###
Used Naming-Scheme: `HTTP#CODE#.html` (customizable by editing the `config.ini`)
To generate the static html pages, run the `generator.php` script:

```shell
php generator.php
```

All generated html files are located into the `dist/` directory by default.

### Compile LESS Files ###
To rebuild the LESS files run the **ANT** build script (requires lessc in your path):

```shell
ant css
```


### Configuration ###

It's possible to change the basic configuration without modifying the generator script. Just change the following variables within the `config.ini`.

You can also specify a custom configuration file by passing it as first argument to the generator script `php generator.php path/myconfig.ini`

**config.ini**

```ini
[global]

; Output Filename Scheme - eg. HTTP500.html
scheme='HTTP%d.html'

; Output dir path
output_dir="docs/"

; Footer content (HTML Allowed)
footer = "Technical Contact: <a href="mailto:x@example.com">x@example.com</a>"
```

## License ##
HttpErrorsPages is OpenSource and licensed under the Terms of [The MIT License (X11)](http://opensource.org/licenses/MIT) - your're welcome to contribute
