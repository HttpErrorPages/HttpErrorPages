const _fs = require('fs-magic');

// parse json file and allow single line comments
async function readJSONFile(filename){
    // load file
    let raw = await _fs.readFile(filename, 'utf8');

    // strip single line js comments
    raw = raw.replace(/^\s*\/\/.*$/gm, '');

    // parse text
    return JSON.parse(raw);
}

module.exports = readJSONFile;