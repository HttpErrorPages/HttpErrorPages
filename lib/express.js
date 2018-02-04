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
    // @see https://github.com/expressjs/express/blob/master/examples/error-pages/index.js
    return function dispatchRequest(page, httpStatusCode, req, res){
        // page available ?
        if (!pages[page]){
            // use "internal server error" as default
            page = '500';
            httpStatusCode = null;
        }

        // set http status code
        res.status(httpStatusCode || 500);

        // extract page date
        const pageData = pages[page];

        // multiple response formats
        res.format({
            // standard http-error-pages
            html: function(){
                res.type('.html');
                res.send(_render(tpl, css, {
                    code: httpStatusCode,
                    title: pageData.title,
                    message: pageData.message,
                    footer: opt.footer
                }))
            },

            // json
            json: function(){
                res.json({
                    error: pageData.title + ' - ' + pageData.message
                })
            },

            // text response
            default: function(){
                // plain text
                res.type('.txt').send(pageData.title + ' - ' + pageData.message);
            }
        })
    }
}

module.exports = async function httpErrorPages(router, options={}){
    
    // create new disptacher with given options
    const dispatch = await createDispatcher(options);

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