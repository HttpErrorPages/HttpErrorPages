var _express = require('express');
var _webapp = _express();
var _httpErrorPages = require('./lib/error-handler');

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
console.log('Running Demo on Port 8888');