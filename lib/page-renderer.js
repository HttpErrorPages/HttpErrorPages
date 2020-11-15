const _ejs = require('ejs');

// render template using given data
module.exports = function renderTemplate(template, css, data={}){

    // pagetitle set ?
    if (!data.pagetitle){
        // use default title
        data.pagetitle = `We've got some trouble | ${data.code} - ${data.title}`;
    }

    // assign css
    data.inlinecss = css;

    // render template
    return _ejs.render(template, data, {
        // wrap all variables into "vars" object
        strict: true,
        _with: false,
        localsName: 'vars',

        // use custom escape function to handle linebreaks!
        escape: function(text){
            if (!text){
                return '';
            }

            // apply generic escape function
            text = _ejs.escapeXML(text);

            // linebreaks
            text = text.replace(/\n/g, '<br />');

            return text;
        }
    });
}