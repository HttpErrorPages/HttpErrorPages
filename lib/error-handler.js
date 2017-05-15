var _dispatcher = require('./dispatcher');

// http404 handler
function notfoundHandler(req, res){
    _dispatcher('404', 404, req, res);
}

// default error handler
function errorHandler(err, req, res, next){
    // status code given ?
    if (err.status){
        // custom errorpage set ?
        _dispatcher(err.errorpage || err.status, err.status, req, res);

    // use default http500 page
    }else{
        _dispatcher('500', 500, req, res);
    }
};

module.exports = function(router){
    // 404
    router.use(notfoundHandler);

    // internal errors (all)
    router.use(errorHandler);
};