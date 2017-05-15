var _path = require('path');
var _fs = require('fs');
var _basedir = _path.dirname(__dirname);

// load template file (1 time)
var _template = _fs.readFileSync(_path.join(_basedir, 'dist/HTTP0.html'), 'utf8');

// simple template renderer
function renderPage(vars){
    var tpl = _template;

    // add vars
    tpl = tpl.replace(/{{([a-z]+)}}/gm, function(match, name){

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