const _render = require('./page-renderer');
const _parseOptions = require('./options');
const _getResources = require('./resources');
const _dispatch = require('./dispatcher');

// wrapper to add custom options
async function createDispatcher(options={}){

    // merge options
    const opt = _parseOptions(options);

    // load resources
    const resources = await _getResources(opt);

    // multi-type support
    // @see https://github.com/expressjs/express/blob/master/examples/error-pages/index.js
    return function dispatchRequest(page, httpStatusCode, req, res, err){

        // run generic dispatcher
        const {pageData, templateVars} = _dispatch(opt, resources, page, httpStatusCode, err);

        // set http status code
        res.status(httpStatusCode || 500);

        // multiple response formats
        res.format({
            // standard http-error-pages
            html: function(){
                res.type('.html');
                res.send(_render(resources.template, resources.stylesheet, opt.filter(templateVars, req, res)))
            },

            // json
            json: function(){
                res.json({
                    error: `${pageData.title} - ${pageData.message}`
                })
            },

            // text response
            default: function(){
                // plain text
                res.type('.txt').send(`${pageData.title} - ${pageData.message}`);
            }
        })
    }
}

module.exports = async function httpErrorPages(router, options={}){
    
    // create new disptacher with given options
    const dispatch = await createDispatcher(options);

    // default 404 error - no route matches
    router.all('*', function(req, res){
        dispatch('404', 404, req, res, new Error('file not found'));
    });

    // internal errors (all)
    // eslint-disable-next-line no-unused-vars
    router.use(function(err, req, res, next){
        // status code given ?
        if (err.status){
            // custom errorpage set ?
            dispatch(err.errorpage || err.status, err.status, req, res, err);
    
        // use default http500 page
        }else{
            dispatch('500', 500, req, res, err);
        }
    });
};