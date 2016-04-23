<?php

$path    = 'photos';
$files = scandir($path);
echo "running";
foreach ($files as $file){
	if ($file != "." && $file != "..") {
		
		//read EXIF header from uploaded file
		$exif = exif_read_data($path."/".$file);

		//fix the Orientation if EXIF data exist
		if(!empty($exif['Orientation'])) {
			$rotatedImage = imagecreatefromjpeg($path."/".$file);
			switch($exif['Orientation']) {
				case 8:
					echo 8;
					$rotatedImage = imagerotate($rotatedImage,90,0);
					imagejpeg($rotatedImage, $path."/".$file);
					break;
				case 3:
				
					echo 3;
					$rotatedImage = imagerotate($rotatedImage,180,0);
					imagejpeg($rotatedImage, $path."/".$file);
					break;
				case 6:
				
					echo 6;
					$rotatedImage = imagerotate($rotatedImage,-90,0);
					imagejpeg($rotatedImage, $path."/".$file);
					break;
			}
		}
	}
}
?>