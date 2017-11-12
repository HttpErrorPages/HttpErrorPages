const _dispatcher = require('./dispatcher');

module.exports = async function(router, options={}){
    // create new disptacher with given options
    const dispatch = await _dispatcher(options);

    // default 404 error - no route matches
    router.all('*', function(req, res){
        dispatch('404', 404, req, res);
    });

    // internal errors (all)
    router.use(function(err, req, res, next){
        // status code given ?
        if (err.status){
            // custom errorpage set ?
            dispatch(err.errorpage || err.status, err.status, req, res);
    
        // use default http500 page
        }else{
            dispatch('500', 500, req, res);
        }
    });
};