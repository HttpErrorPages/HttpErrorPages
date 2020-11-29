const _express = require('express');
const _webapp = _express();

// use require('http-error-pages') for regular apps!
const _httpErrorPages = require('../lib/main');

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

    // throw an unknown error
    _webapp.get('/unknown', function(req, res, next){
        const myError = new Error();
        myError.status = 523;
        next(myError);
    });

    // throw an internal error
    _webapp.get('/500', function(req, res){
        throw new Error('Server Error');
    });

    // custom errorhandling middleware
    // use this pattern in production to log errors!
    _webapp.use(function(err, req, res, next){
        console.log(`[custom logging middleware] ${err.message}`);
        // forward error
        next(err);
    });

    // use http error pages handler (final statement!)
    // because of the asynchronous file-loaders, wait until it has been executed
    await _httpErrorPages.express(_webapp, {
        lang: 'en_US',
        payload: {
            footer: 'Hello <strong>World</strong>',
            pagetitle: 'we are sorry - an internal error encountered',
        },
        filter: function(data, req, res){
            // remove footer
            //data.footer = null;
            return data;
        },
        onError: function(data){
            // for debugging purpose only!!
            // use custom middleware for errorlogging!!
            console.log(`[expressjs] ERROR: ${data.title}\n${data.error.stack}`)
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