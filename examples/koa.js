const _koa = require('koa');
const _webapp = new _koa();

// use require('http-error-pages') for regular apps!
const _httpErrorPages = require('../lib/main');

async function bootstrap(){

    // use http error pages handler (INITIAL statement!)
    // because of the asynchronous file-loaders, wait until it has been executed - it returns an async handler
    _webapp.use(await _httpErrorPages.koa({
        lang: 'en_US',
        payload: {
            footer: 'Hello <strong>World</strong>',
            pagetitle: 'we are sorry - an internal error encountered',
        },
        filter: function(data, ctx){
            // remove footer
            //data.footer = null;
            return data;
        },
        onError: function(data){
            // for debugging purpose only!!
            // use custom middleware for errorlogging!!
            console.log(`[koa] ERROR: ${data.title}\n${data.error.stack}`)
        }
    }));

    // demo handler
    _webapp.use(async (ctx, next) => {
        if (ctx.path == '/'){
            ctx.type = 'text';
            ctx.body = 'HttpErrorPages Demo';
        }else{
            return next();
        }
    });

    // throw an 403 error
    _webapp.use(async (ctx, next) => {
        if (ctx.path == '/my403error'){
            ctx.throw(403);
        }else{
            return next();
        }
    });

    // throw an 533 error with status 500
    _webapp.use(async (ctx, next) => {
        if (ctx.path == '/x533'){
            const e = new Error("custom");
            e.errorpage = '533';
            e.status = 500;
            throw e;
        }else{
            return next();
        }
    });

    // throw an internal error
    _webapp.use(async (ctx, next) => {
        if (ctx.path == '/500'){
            throw new Error('Server Error');
        }else{
            return next();
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