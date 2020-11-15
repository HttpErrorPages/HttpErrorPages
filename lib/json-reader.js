const _fs = require('fs-magic');

// parse json file and allow single line comments
module.exports = async function readJSONFile(filename){
    // load file
    let raw = await _fs.readFile(filename, 'utf8');

    // strip single line js comments
    raw = raw.replace(/^\s*\/\/.*$/gm, '');

    // try to parse json
    try{
        return JSON.parse(raw);
    }catch(e){
        console.log(`Error parsing JSON file: [${filename}]`);
        throw e;
    }
}