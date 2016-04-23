<?php
$path    = 'photos/thumbs';
$files = scandir($path);
$album = [];
$i = 0;
foreach ($files as $key => $file){
	if ($file != "." && $file != "..") {
		$album[$i]["filename"] = $file;
		list($width, $height) = getimagesize($path."/".$file);
		$album[$i]["width"] = $width;
		$album[$i]["height"] = $height;
	$i++;
	}
}
$returnVal = json_encode($album);
echo $returnVal;
?>