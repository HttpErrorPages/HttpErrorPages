<?php
/**
 * HttpErrorPages HTML Generator
 */

// default config file
$configFilename = 'config.ini';

// config file specified ?
if (isset($argv[1])){
    if (is_file($argv[1])){
        echo 'Using Config File "', $argv[1], '"', PHP_EOL;
        $configFilename = $argv[1];
    }else{
        echo 'Error: Config File "', $argv[1], '" not found - Using default one', PHP_EOL;
    }
}else{
    echo 'Using Default Config File "', $configFilename, '"', PHP_EOL;
}

// load config
$config = parse_ini_file($configFilename, false);

//default language
$language = 'en_US'; 

if (isset($argv[2])) {
    $language = $argv[2];
}

//Internationalization
switch($language) {
    case 'pt_BR':
        $pages = require('pages-pt_BR.php');
        break;
    case 'en_US':
        $pages = require('pages-en_US.php');
        break;
    default:
        $pages = require('pages-en_US.php');
        break;      
}

// store pages as json data
file_put_contents('dist/pages.json', json_encode($pages));

// load inline css
$css = trim(file_get_contents('assets/Layout.css'));

// js template page
$pages['{{code}}'] = array(
    'title' => '{{title}}',
    'message' => '{{message}}',
    'footer' => '{{footer}}'
);

// generate each error page
foreach ($pages as $code => $page){
    echo 'Generating Page ', $page['title'], ' (', $code, ')..', PHP_EOL;

    // assign variables
    $v_code = $code;
    $v_title = nl2br(htmlspecialchars($page['title']));
    $v_message = nl2br(htmlspecialchars($page['message']));
    $v_footer = (isset($config['footer']) ? $config['footer'] : '');

    // render template
    ob_start();
    require('template.phtml');
    $errorpage = ob_get_clean();

    // generate output filename
    $filename = sprintf($config['scheme'], $v_code);

    // store template
    if (is_dir($config['output_dir'])){
        file_put_contents($config['output_dir'] . $filename, $errorpage);
    }else{
        echo 'Error: Output dir "', $config['output_dir'], '" not found', PHP_EOL;
    }
}