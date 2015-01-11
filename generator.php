<?php
/**
 * HttpErrorPages HTML Generator
 */

// load pages
$pages = require('pages.php');

// load template
$tpl = file_get_contents('template.html');

// generate each error page
foreach ($pages as $code => $page){
	// copy template
	$errorpage = $tpl;
	
	// assign variables
	$errorpage = str_replace('{{CODE}}', intval($code), $errorpage);
	$errorpage = str_replace('{{TITLE}}', nl2br(htmlspecialchars($page['title'])), $errorpage);
	$errorpage = str_replace('{{MESSAGE}}', nl2br(htmlspecialchars($page['message'])), $errorpage);
	
	// store template
	file_put_contents('Build/HTTP'.intval($code).'.html', $errorpage);
}