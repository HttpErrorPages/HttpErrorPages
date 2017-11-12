const _ejs = require('ejs');

// render template using given data
function renderTemplate(template, css, data={}){
  
    // assign css
    data.inlinecss = css;

    // render template - use custom escape function to handle linebreaks!
    return _ejs.render(template, data, {
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

module.exports = renderTemplate;