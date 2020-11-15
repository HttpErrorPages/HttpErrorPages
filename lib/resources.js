const _path = require('path');
const _fs = require('fs-magic');
const _jsonReader = require('./json-reader');

// wrapper to add custom options
module.exports = async function loadResources(opt){

    // load page template
    const template = opt.template && await _fs.readFile(opt.template, 'utf8');

    // load styles
    const stylesheet = opt.stylesheet && await _fs.readFile(opt.stylesheet, 'utf8');
    
    // load page definitions
    const pages = opt.lang && await _jsonReader(_path.join(__dirname, '../i18n/pages-' + opt.lang + '.json'));

    return {
        template: template,
        stylesheet: stylesheet,
        pages: pages
    };
}