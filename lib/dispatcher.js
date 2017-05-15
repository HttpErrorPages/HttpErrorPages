var _pages = require('../dist/pages.json');
var _renderer = require('./page-renderer');

// multi-type support
// @see https://github.com/expressjs/express/blob/master/examples/error-pages/index.js
function dispatchRequest(page, httpStatusCode, req, res){
    // page available ?
    if (!_pages[page]){
        // use "internal server error" as default
        page = '500';
        httpStatusCode = null;
    }

    // set http status code
    res.status(httpStatusCode || 500);

    // extract page date
    var pageData = _pages[page];

    // multiple response formats
    res.format({
        // standard http-error-pages
        html: function(){
            res.type('.html');
            res.send(_renderer({
                code: httpStatusCode,
                title: pageData.title,
                message: pageData.message
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

module.exports = dispatchRequest;