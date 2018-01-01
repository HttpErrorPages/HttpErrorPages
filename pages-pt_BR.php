<?php
return array (
        
        // STANDARD ERROR CODES
        // =======================================================
        '400' => array (
                'title' => 'Requisição inválida',
	        'message' => 'Oops! Não conseguimos processar a requisição.'	
        ),
        '401' => array (
                'title' => 'Não Autorizado',
                'message' => 'Oops! O recurso requer uma autenticação.'
        ),
        '403' => array (
                'title' => 'Acesso Negado',
                'message' => 'Oops! O recurso requer uma autenticação.' 
        ),
        
        // http 404 not found
        '404' => array (
                'title' => 'Página Não Encontrada',
	        'message'=>'Oops! Não conseguimos encontrar a página que você estava procurando.'	
        ),
        
        // internal server error
        '500' => array (
                'title' => 'Webservice Atualmente Não Disponível',
                'message' => "Uma condição inesperada foi encontrada.\nNosso time de serviços está trabalhando para deixar isso online novamente." 
        ),
        
        // unknown http method
        '501' => array (
                'title' => 'Não implementado',
		'message' => 'Oops! O Webserver não conseguiu reconhecer o método solicitado'
        ),
        
        // http proxy forward error
        '502' => array (
		'title' => 'Webservice atualmente indisponível',
		'message' => "Nós tivemos alguns problema com o nosso backend. Nosso time de serviços está trabalhando para deixar isso online novamente."
        ),
        
        // webserver service error
        '503' => array (
                'title' => 'Webservice atualmente indisponível',
                'message' => "Nós tivemos alguns problema com o nosso backend. Nosso time de serviços está trabalhando para deixar isso online novamente."
        ),
        
        // CUSTOM ERROR CODES
        // =======================================================
        // webserver origin error
        '520' => array(
            'title' => 'Origin Error - Host Desconhecido',
            'message' => 'O hostname requisitado não é roteado. Use apenas hostnames para acessar recursos.'
        ),
        
        // webserver down error
        '521' => array (
                'title' => 'Webservice atualmente indisponível',
                'message' => "Nós tivemos alguns problema com o nosso backend. Nosso time de serviços está trabalhando para deixar isso online novamente."
        ),
        
        // maintenance
        '533' => array(
                'title' => 'Estamos em manutenção',
                'message' => "O site está offline para manutenção.\nNosso time está trabalhando para reestabelecer o serviço em breve."                
        )
);
