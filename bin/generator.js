#!/usr/bin/env node

const _fs = require('fs-magic');
const _path = require('path');
const _cli = require('commander');
const _pkg = require('../package.json');
const _render = require('../lib/page-renderer');
const _jsonReader = require('../lib/json-reader');
const _getResources = require('../lib/resources');

// paths
const _assetsPath = _path.join(__dirname, '../assets');
const _langPath = _path.join(__dirname, '../i18n');

// default files
const _defaults = {
    distDir: _path.join(__dirname, '../dist'),
    configFile: _path.join(__dirname, '../config.json'),
    templateFile: _path.join(_assetsPath, 'template.ejs'),
    cssFile:  _path.join(_assetsPath, 'layout.css')
};

// generate static pages
async function generator(configFilename, distPath, opt){
    // load config
    const config = await _jsonReader(configFilename);

    // load page definitions
    const pageDefinitions = await _jsonReader(opt.pages);

    // load resources
    const resources = await _getResources({
        template: opt.template,
        stylesheet: opt.stylesheet,
        lang: null
    });

    console.log('Generating static pages');

    // for each errorcode generate custom page
    await Promise.all(Object.keys(pageDefinitions).map(async function(code){
        // get page config. title+message available
        const pageData = pageDefinitions[code];

        // merge variables for ejs template usage
        const templateVars = Object.assign({}, pageData, {
            code: code,
            language: opt.lang.substr(0, 2)
        }, config);

        // apply filter for template variable usage within the config
        const varNames = Object.keys(templateVars);
        const placeholderData = Object.assign({}, templateVars);
        for (const key in templateVars){
            templateVars[key] = templateVars[key] && templateVars[key].replace(/%([\w]+)%/g, function(match, name){
                // name exists ?
                if (varNames.includes(name)){
                    return placeholderData[name];
                }else{
                    throw new Error(`unknown placeholder "${name}" used in template variable [${key}]`);
                }
            });
        }

        // render page
        const content = await _render(resources.template, resources.stylesheet, templateVars);

        // write content to file
        await _fs.writeFile(_path.join(distPath, templateVars.scheme), content, 'utf8');

        console.log(` |- Page <${templateVars.scheme}>`);
    }));
}

// CLI setup
_cli
// read file version package.json
.version(_pkg.version)

// static error page generator
.command('static [config]')
    .description('run http-error-pages generator')
    .option('-t, --template <path>', 'path to your custom EJS template file', _defaults.templateFile)
    .option('-s, --styles <path>', 'path to your custom stylesheet (precompiled as CSS!)', _defaults.cssFile)
    .option('-p, --pages <path>', 'path to your custom page definition', null)
    .option('-l, --lang <lang>', 'the language of the default page definition', 'en_US')
    .option('-o, --out <path>', 'output directory', _defaults.distDir)

    .action(function(configFilename, options){
        // config set ?
        const configPath = configFilename || _defaults.configFile;

        // custom page definition available ?
        const pageDefinitionFile = options.pages || _path.join(_langPath, 'pages-'+ options.lang + '.json');

        // show paths
        console.log('');
        console.log('Paths');
        console.log(' |- Config:', configPath);
        console.log(' |- Template:', options.template);
        console.log(' |- Styles:', options.styles);
        console.log(' |- Pages:', pageDefinitionFile);
        console.log('');

        // run async generator
        generator(configPath, options.out, {
                template: options.template,
                stylesheet: options.styles,
                lang: options.lang,
                pages: pageDefinitionFile
            })
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