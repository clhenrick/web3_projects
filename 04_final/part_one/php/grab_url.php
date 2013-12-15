<?php

        header("Access-Control-Allow-Origin: *");

        //echo('hello!');
        

        $url = file_get_contents("http://api.wefeelfine.org:8080/ShowFeelings?display=xml&returnfields=imageid,feeling,sentence,posttime,postdate,posturl,gender,born,country,state,city,lat,lon,conditions&limit=500");

        $simpleXml = simplexml_load_string($url);

        $feelings = array();
		
	foreach($simpleXml as $feeling) {
	    $feelings[] = array('feeling' => $feeling['feeling'] . '');
	}
        
	$json = json_encode($feelings);


        //$json = json_encode($simpleXml);

        echo($json);

?>