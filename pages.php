<?php
return array (
        
        // STANDARD ERROR CODES
        // =======================================================

        '400' => array (
                'title' => 'Bad Request',
                'message' => 'The server cannot process the request due to something that is perceived to be a client error.' 
        ),
        '401' => array (
                'title' => 'Unauthorized',
                'message' => 'The requested resource requires an authentication.'
        ),

        '403' => array (
                'title' => 'Access Denied',
                'message' => 'The requested resource requires an authentication.' 
        ),
        
        // http 404 not found
        '404' => array (
                'title' => 'Resource not found',
                'message' => 'The requested resource could not be found but may be available again in the future.' 
        ),
        
        // internal server error
        '500' => array (
                'title' => 'Webservice currently unavailable',
                'message' => "An unexpected condition was encountered.\nOur service team has been dispatched to bring it back online." 
        ),
        
        // unknown http method
        '501' => array (
                'title' => 'Not Implemented',
                'message' => 'The Webserver cannot recognize the request method.'
        ),
        
        // http proxy forward error
        '502' => array (
                'title' => 'Webservice currently unavailable',
                'message' => "We've got some trouble with our backend upstream cluster.\nOur service team has been dispatched to bring it back online."
        ),
        
        // webserver service error
        '503' => array (
                'title' => 'Webservice currently unavailable',
                'message' => "We've got some trouble with our backend upstream cluster.\nOur service team has been dispatched to bring it back online."
        ),
        
        // CUSTOM ERROR CODES
        // =======================================================

        // webserver origin error
        '520' => array(
            'title' => 'Origin Error - Unknown Host',
            'message' => 'The requested hostname is not routed. Use only hostnames to access resources.'
        ),
        
        // webserver down error
        '521' => array (
                'title' => 'Webservice currently unavailable',
                'message' => "We've got some trouble with our backend upstream cluster.\nOur service team has been dispatched to bring it back online."
        ),
        
        // maintenance
        '533' => array(
                'title' => 'Scheduled Maintenance',
                'message' => "This site is currently down for maintenance.\nOur service team is working hard to bring it back online soon."                
        )
);