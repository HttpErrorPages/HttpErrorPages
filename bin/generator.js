#!/usr/bin/env node

const _fs = require('fs-magic');
const _path = require('path');
const _assetsPath = _path.join(__dirname, '../assets');
const _langPath = _path.join(__dirname, '../i18n');
const _cli = require('commander');
const _pkg = require('../package.json');
const _pageRenderer = require('../lib/page-renderer');
const _jsonReader = require('../lib/json-reader');

// global paths
let templatePath = null;
let cssPath = null;

async function generator(configFilename, pageDefinitionFile, distPath){
    // load config
    const config = await _jsonReader(configFilename);

    // load page definitions
    const pages = await _jsonReader(pageDefinitionFile);

    // load template
    const tpl = await _fs.readFile(templatePath, 'utf8');
   
    // load css
    const css = await _fs.readFile(cssPath, 'utf8');

    const lang = pageDefinitionFile.substr(-10, 2);

    console.log('Create/Empty distribution folder: "'+distPath+'"\n');

    if(await _fs.exists(distPath)) {
        await _fs.rmrf(distPath);
    }
    await _fs.mkdirp(distPath);

    console.log('Generating static pages');

    // for each errorcode generate custom page
    await Promise.all(Object.keys(pages).map(async function(code){
        // page config
        const pconf = pages[code];

        // inject errorcode
        pconf.code = code;

        // inject lang
        pconf.lang = lang || 'en';

        // inject page title
        if(config && config.page_title) {
            pconf.page_title = config.page_title.replace('%code%', code);
            pconf.page_title = pconf.page_title.replace('%title%', pconf.title);
        }

        // inject error
        pconf.error = 'Error '+ pconf.code 
        if(config && config.error) {
            pconf.error = config.error.replace('%code%', code);
        }

        // inject footer
        pconf.footer = pconf.footer || config.footer;

        // render page
        const content = await _pageRenderer(tpl, css, pconf);

        // generate filename
        let filename = 'HTTP' + code + '.html';

        // check filename schema
        if(config && config.scheme && config.scheme.indexOf("%code%") !== -1) {
            filename =  config.scheme.replace('%code%', code);
        }
        
        // write content to file
        await _fs.writeFile(_path.join(distPath, filename), content, 'utf8');

        console.log(' |- Page <' + filename + '>');
    }));
}

// CLI setup
_cli
// read file version package.json
.version(_pkg.version)

// static error page generator
.command('static [config]')
    .description('run http-error-pages generator')
    .option('-t, --template <path>', 'path to your custom EJS template file', null)
    .option('-s, --styles <path>', 'path to your custom stylesheet (precompiled as CSS!)', null)
    .option('-p, --pages <path>', 'path to your custom page definition', null)
    .option('-l, --lang <lang>', 'the language of the default page definition', null)
    .option('-o, --out <path>', 'output directory', null)
    .action(function(configFilename, options){
        // config set ?
        const configPath = configFilename || _path.join(__dirname, '../config.json');

        // template path set ?
        templatePath = options.template || _path.join(_assetsPath, 'template.ejs');

        // style path set ?
        cssPath = options.styles || _path.join(_assetsPath, 'layout.css');

        // output path set ?
        const distPath = options.out || _path.join(__dirname, '../dist');

        // language set ? use en_US as default
        const lang = options.lang || 'en_US';

        // custom page definition available ?
        let pageDefinitionFile = options.pages || null;

        // page definition not set ? use lang
        if (pageDefinitionFile === null){
            pageDefinitionFile = _path.join(_langPath, 'pages-'+ lang + '.json') 
        }

        // show paths
        console.log('');
        console.log('Paths');
        console.log(' |- Config:', configPath);
        console.log(' |- Template:', templatePath);
        console.log(' |- Styles:', cssPath);
        console.log(' |- Pages:', pageDefinitionFile);
        console.log('');

        // run async generator
        generator(configPath, pageDefinitionFile, distPath)
            .then(function(){
                console.log('Static files generated\n');
            })
            .catch(function(e){
                console.error(e);
                console.log('\nStatic files not generated\n');
            });
    });

_cli
    .command('*')
    .action(function(c){
        console.error('Unknown command "' + c + '"');
        _cli.outputHelp();
    });

// run the commander dispatcher
_cli.parse(process.argv);

// default action (no command provided)
if (!process.argv.slice(2).length) {
_cli.outputHelp();
}