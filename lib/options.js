const _path = require('path');

// wrapper to add custom options
module.exports = function getOptions(opt){

    // merge options
    const options = {
        template: opt.template || _path.join(__dirname, '../assets/template.ejs'),
        stylesheet: opt.css || _path.join(__dirname, '../assets/layout.css'),
        lang: opt.lang || 'en_US',
        payload: opt.payload || {},
        filter: opt.filter || function(d){return d},
        onError: opt.onError || null
    };

    return options;
}