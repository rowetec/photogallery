<?php

$path    = '../photos/full';
$thumbPath = '../photos/thumbs';
$sizelimit = 350;

$files = scandir($path);
echo "running";
foreach ($files as $file){
	if ($file != "." && $file != "..") {
		$filePath = $path."/".$file;
		$thumbImagePath = $thumbPath."/".$file;
		
		////////////// Create Main Image //////////
		$im=ImageCreateFromJPEG($filePath); 
		$width=ImageSx($im); // Original picture width is stored
		$height=ImageSy($im); // Original picture height is stored
		if($width > $height && $width > $sizelimit){
			$newWidth = $sizelimit;
			$ratio = $newWidth / $width;
			$newHeight = $height * $ratio;
		}
		elseif($height > $sizelimit){
			$newHeight = $sizelimit;
			$ratio = $sizelimit / $height;
			$newWidth = $width * $ratio;
		}
		else{
			$newHeight = $height;
			$newWidth = $width; 
		}
		
		$newimage=imagecreatetruecolor($newWidth,$newHeight); 
		imageCopyResampled($newimage,$im,0,0,0,0,$newWidth,$newHeight,$width,$height);
		ImageJpeg($newimage,$thumbImagePath);
		//chmod($thumbImagePath,0777;
		
		//////////////// End of JPG thumbnail creation //////////
			
	}
}



?>


