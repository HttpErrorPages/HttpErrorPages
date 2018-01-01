const _path = require('path');
const _fs = require('fs');
const _basedir = _path.dirname(__dirname);

// load template file (1 time)
const _template = _fs.readFileSync(_path.join(_basedir, 'dist/HTTP0.html'), 'utf8');

// simple template renderer
function renderPage(vars){
    
    // add vars
    const tpl = _template.replace(/{{([a-z]+)}}/gm, function(match, name){

        // var available ?
        if (vars[name]){
            return vars[name];
        // remove unused vars
        }else{
            return '';
        }
    });

    return tpl;
}

module.exports = renderPage;