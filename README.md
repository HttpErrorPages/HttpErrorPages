# Bootstrap based HttpErrorPages #
Simple, [Bootstrap](http://getbootstrap.com/) based HTTP Error Page Generator. Create a bunch of custom error pages - suitable to use with [Lighttpd](http://redmine.lighttpd.net/projects/lighttpd/wiki/Docs_ConfigurationOptions), Nginx or Apache.

![Screenshot](http://httperrorpages.andidittrich.de/screenshot1.png)

## Demo ##
* [HTTP400](http://httperrorpages.andidittrich.de/HTTP400.html)
* [HTTP401](http://httperrorpages.andidittrich.de/HTTP401.html)
* [HTTP403](http://httperrorpages.andidittrich.de/HTTP403.html)
* [HTTP404](http://httperrorpages.andidittrich.de/HTTP404.html)
* [HTTP500](http://httperrorpages.andidittrich.de/HTTP500.html)
* [HTTP501](http://httperrorpages.andidittrich.de/HTTP501.html)
* [HTTP502](http://httperrorpages.andidittrich.de/HTTP502.html)
* [HTTP503](http://httperrorpages.andidittrich.de/HTTP503.html)
* [HTTP520](http://httperrorpages.andidittrich.de/HTTP520.html)
* [HTTP521](http://httperrorpages.andidittrich.de/HTTP521.html)

## Integration ##

## Lighttpd ##
[Lighttpd](http://www.lighttpd.net/) supports custom error-pages using the [server.errorfile-prefix](http://redmine.lighttpd.net/projects/lighttpd/wiki/Server_errorfile-prefixDetails) directive.
File: `lighttpd.conf`
Example - assumes HttpErrorPages are located into `/var/www/ErrorPages/`.

```ApacheConf
server.errorfile-prefix = "/var/www/ErrorPages/HTTP"
```

## Apache Httpd##
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

## NGINX ##
[NGINX](http://nginx.org/) supports custom error-pages using multiple [error_page](http://nginx.org/en/docs/http/ngx_http_core_module.html#error_page) directives.
File: `httpd.conf` or `.htaccess`
Example - assumes HttpErrorPages are located into `/var/www/ErrorPages/`.

```ApacheConf
error_page 400 401 402 403 404 /error/HTTP40x.html;
error_page 500 501 502 503 /error/HTTP50x.html;

location ^~ /error/ {
	internal;
	root /var/www/ErrorPages;
}
```

## Customization ##
To customize the pages, you can edit the **template.phtml** file and add your own styles. Finally run the generator-script.
If you wan't to add custom pages/additional error-codes, just put a new entry into the `pages.php` file. The generator-script will process each entry and generates an own page.

#### Custom Page Example (pages.php) ####
Error-Codes used by CloudFlare

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
Used Naming-Scheme: **HTTP**__CODE__**.html** (customizable by editing the generator script)
To generate the static html pages, run the `generator.php` script:

```shell
php generator.php
```

All generated html files are located into the `Build/` directory.


## License ##
HttpErrorsPages is OpenSource and licensed under the Terms of [The MIT License (X11)](http://opensource.org/licenses/MIT) - your're welcome to contribute