const _render = require('./page-renderer');
const _path = require('path');
const _fs = require('fs-magic');
const _jsonReader = require('./json-reader');

// wrapper to add custom options
async function createDispatcher(options={}){

    // merge options
    const opt = {
        template: options.template || _path.join(__dirname, '../assets/template.ejs'),
        css: options.css || _path.join(__dirname, '../assets/layout.css'),
        lang: options.lang || 'en_US',
        footer: options.footer || null
    };

    // load page template
    const tpl = await _fs.readFile(opt.template, 'utf8');

    // load styles
    const css = await _fs.readFile(opt.css, 'utf8');
    
    // load page definitions
    const pages = await _jsonReader(_path.join(__dirname, '../i18n/pages-' + opt.lang + '.json'));

    // multi-type support
    // @see https://github.com/koajs/koa/blob/master/docs/api/response.md#responseistypes
    return function dispatchRequest(page, httpStatusCode, ctx){
        // page available ?
        if (!pages[page]){
            // use "internal server error" as default
            page = '500';
            httpStatusCode = null;
        }

        // set http status code
        ctx.status = httpStatusCode || 500;

        // extract page date
        const pageData = pages[page];

        // multiple response formats
        switch (ctx.accepts('json', 'html', 'text')){

            // jsonn response
            case 'json':
                ctx.type = 'json';
                ctx.body = {
                    error: pageData.title + ' - ' + pageData.message
                }
                break;

            // html response
            case 'html':
                ctx.type = 'html';
                ctx.body = _render(tpl, css, {
                    code: httpStatusCode,
                    title: pageData.title,
                    message: pageData.message,
                    footer: opt.footer
                });
                break;
            
            // default: text response
            default:
                ctx.type = 'text/plain';
                ctx.body = pageData.title + ' - ' + pageData.message;
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
                dispatch('404', 404, ctx);
            }
        }catch(err){
            // status code given ?
            if (err.status){
                // custom errorpage set ?
                dispatch(err.errorpage || err.status, err.status, ctx);

            // use default http500 page
            }else{
                dispatch('500', 500, ctx);
            }
        }
    }
}