<?php
/**
 * HttpErrorPages HTML Generator
 */

$config = array(
	'footer' => 'Technical Contact: <a href="mailto:x@example.com">x@example.com</a>'
);

// load pages
$pages = require('pages.php');

// load inline css
$css = trim(file_get_contents('Resources/Layout.css'));

// generate each error page
foreach ($pages as $code => $page){
	
	// assign variables
	$v_code = intval($code);
	$v_title = nl2br(htmlspecialchars($page['title']));
	$v_message = nl2br(htmlspecialchars($page['message']));	
	
	// render template
	ob_start();
	require('template.phtml');
	$errorpage = ob_get_clean();
	
	// store template
	file_put_contents('Build/HTTP'.$v_code.'.html', $errorpage);
}