
// generic error dispatching
module.exports = function dispatch(opt, resources, page, httpStatusCode, err){
    // page available ?
    if (!resources.pages[page]){
        // use "internal server error" as default
        page = '500';
        httpStatusCode = null;
    }

    // extract page date
    // page found ? fallback in case http500 template not exists
    const pageData = resources.pages[page] || {
        title: 'Internal Server Error',
        message: 'Additionally, FileNotFound was encountered while trying to use an ErrorDocument to handle the request'
    };

    // create template variables
    const templateVars = Object.assign({}, {
        title: pageData.title,
        message: pageData.message,
        code: httpStatusCode || 500,
        language: opt.lang.substr(0, 2),
        error: err
    }, opt.payload);

    // debug error handler set ?
    if (opt.onError){
        opt.onError(templateVars);
    }

    return {
        pageData: pageData,
        templateVars: templateVars
    };
}