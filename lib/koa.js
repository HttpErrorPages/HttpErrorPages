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
    // @see https://github.com/koajs/koa/blob/master/docs/api/response.md#responseistypes
    return function dispatchRequest(page, httpStatusCode, ctx, err){

        // run generic dispatcher
        const {pageData, templateVars} = _dispatch(opt, resources, page, httpStatusCode, err);

        // set http status code
        ctx.status = httpStatusCode || 500;

        // multiple response formats
        switch (ctx.accepts('json', 'html', 'text')){

            // jsonn response
            case 'json':
                ctx.type = 'json';
                ctx.body = {
                    error: `${pageData.title} - ${pageData.message}`
                }
                break;

            // html response
            case 'html':
                ctx.type = 'html';
                ctx.body = _render(resources.template, resources.stylesheet, opt.filter(templateVars, ctx));
                break;
            
            // default: text response
            default:
                ctx.type = 'text/plain';
                ctx.body = `${pageData.title} - ${pageData.message}`;
          }
    }
}

module.exports = async function httpErrorPages(options={}){

    // create new disptacher with given options
    const dispatch = await createDispatcher(options);

    // create error handler
    // @see https://github.com/koajs/koa/blob/master/docs/error-handling.md
    return async (ctx, next) => {
        try{
            // dispatch middleware chain
            await next();

            // route not found ?
            if (ctx.status === 404) {
                dispatch('404', 404, ctx, new Error('file not found'));
            }
        }catch(err){
            // status code given ?
            if (err.status){
                // custom errorpage set ?
                dispatch(err.errorpage || err.status, err.status, ctx, err);

            // use default http500 page
            }else{
                dispatch('500', 500, ctx, err);
            }
        }
    }
}