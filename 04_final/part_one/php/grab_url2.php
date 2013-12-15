<body>   
    

<?php

	$url = $_GET['url'];
	$returnfields = $_GET['returnfields'];
	$limit = $_GET['limit'];

	$fullurl = $url . "&returnfields=" . $returnfields . "&limit=" .$limit;
	
	$html = simplexml_load_file('http://helloimalex.com/web3/chris/test.xml');
	//$html = xmlrpc_encode($html);
 	var_dump($html); 
	

	echo 'great!';
	
?>

</body>
