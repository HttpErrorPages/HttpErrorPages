# Bootstrap based HttpErrorPages #
Simple, [Bootstrap](http://getbootstrap.com/) based HTTP Error Page Generator.

Naming-Scheme: **HTTP**__<CODE>__**.html**

## Customization ##
To customize the pages, you can edit the **template.phtml** file and add your own styles. Finally run the generator-script.
If you wan't to add custom pages/additional error-codes, just put a new entry into the `pages.php` file. The generator-script will process each entry and generates an own page.

#### Custom Page Example (pages.php) ####

```php
// webserver origin error
'520' => array(
	'title' => 'Origin Error - Unknown Host',
	'message' => 'The requested hostname is not routed. Use only hostnames to access resources.'
),		
```

### Build/Generator ###
To generate the static html pages, run the `generator.php` script:

```shell
php generator.php
```

All generated html files are located into the `Build/` directory.


## License ##
HttpErrorsPages is OpenSource and licensed under the Terms of [The MIT License (X11)](http://opensource.org/licenses/MIT) - your're welcome to contribute