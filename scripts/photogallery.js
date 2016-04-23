jQuery(function(){
	
	maxImageWidth = 200;
	maxImageHeight = 200;
	imageMargin = 20;
	photoPaneWidth = jQuery("#maingallerydiv #photopane").width;
	galleryImages = [];
	loadGallery();
	jQuery(window).resize(function(){
		console.log("Test");
		var resizeTimer;
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function() {
			// Run code here, resizing has "stopped"
			resizeGallery(true);
		}, 500);
	});
});

loadGallery = function(){
	jQuery.ajax({
		url: "getalbum.php",
	}).success(function(result) {
		var albumImages = JSON.parse(result);
		var html = "";//"<div id=\"spacer\"></div>";
		var i = 0;
		albumImages.forEach(function(item){
			if (item.width > item.height){
				var orientation = "landscape";
				var dimensionRatio = item.height / item.width;
				var thumbWidth = 200;
				var thumbHeight = thumbWidth * dimensionRatio;
			}
			else {
				var orientation = "portrait";
				var dimensionRatio = item.width / item.height;
				var thumbHeight = 200;
				var thumbWidth = thumbHeight * dimensionRatio;
			}
			galleryImages[i] = new galleryImage (item.filename, item.width, item.height, orientation, dimensionRatio, thumbHeight, thumbWidth);
			i++;
		});
		galleryImages.forEach(function(item){
			html = html + '<div class="albumimagecontainer"><div class="albumimagehorizonalalign"><div class="albumimage"><img src="photos/'+item.filePath+'" height="'+item.thumbHeight+'" width="'+item.thumbWidth+'" /></div></div></div>';
		});
		
		jQuery("#maingallerydiv #photopane").html(html);
		jQuery("#maingallerydiv .albumimage").hide().children("img").hide();
		
		resizeGallery(false)
		
		showImages(jQuery("#maingallerydiv .albumimagecontainer").first());
		
	});
};

function showImages(object) {
	//show, find next image, repeat, when next doesn't find anything, it'll stop
	object.width(maxImageWidth+"px").height(maxImageHeight+"px")
	.children(".albumimagehorizonalalign").width(object.children(".albumimagehorizonalalign").children(".albumimage").children("img").width())
	.children(".albumimage").width(object.children(".albumimagehorizonalalign").children(".albumimage").children("img").width()).height(object.children(".albumimage")
	.children("img").height()).show()
	.children("img").fadeIn(100);
	setTimeout(function(){
		showImages(jQuery(object).next());
	},10);
};

function galleryImage (filePath,width,height,orientation,dimensionRatio,thumbHeight,thumbWidth){
	this.filePath 		= filePath;
	//this.galleryId 	= galleryId;
	this.width	 		= width;
	this.height			= height;
	this.orientation	= orientation;
	this.dimensionRatio	= dimensionRatio;
	this.thumbHeight	= thumbHeight;
	this.thumbWidth		= thumbWidth;
	//this.dateTime		= dateTime;
	//this.Id			= Id;
}

function resizeGallery(animate) {
	//jQuery(window).off("resize");
	var numberOfImagesAcross = Math.floor((jQuery("#maingallerydiv #photopane").width()-15)/(imageMargin*2+maxImageWidth));
	
	
	var spacerWidth = Math.floor(((jQuery("#maingallerydiv #photopane").width() - numberOfImagesAcross * (imageMargin*2+maxImageWidth))) / 2);
	var i = 0;
	var column = 1;
	var row = 1;
	jQuery("#maingallerydiv .albumimagecontainer").each(function(){
		
		if ((Math.floor(i / numberOfImagesAcross)+1) != row){
			column = 1;
		}
		row = Math.floor(i / numberOfImagesAcross)+1;
		if (row == 1){
			fromTop = imageMargin;
		}
		else{
			fromTop = (imageMargin*2+maxImageHeight)*(row-1)+imageMargin;
		}
		
		if ( column == 1){
			fromLeft = spacerWidth;
		}
		else{
			fromLeft = (imageMargin*2+maxImageWidth)*(column-1)+imageMargin+spacerWidth;
		}
		if (!animate){
			jQuery(this).stop().css({
				"left" : fromLeft + "px",
				"top" : fromTop + "px"
			})
		}
		else {
			jQuery(this).stop().animate({
				"left" : fromLeft + "px",
				"top" : fromTop + "px"
			})
		}
		i++;
		column++;
	});
	/*setTimeout(function(){
		jQuery(window).resize(function(){
			resizeGallery();
		});
	},1000);
	*/
	//jQuery("#maingallerydiv #photopane #spacer").width(spacerWidth+"px");
};

/*function resizeGallery() {
	var numberOfImageAcross = Math.floor((jQuery("#maingallerydiv #photopane").width()-15)/(imageMargin*2+maxImageWidth));
	console.log ("Div Width: "+jQuery("#maingallerydiv #photopane").width());
	console.log ("No Of Images: "+numberOfImageAcross);
	console.log ("Margin: "+imageMargin);
	console.log ("Image Width: "+maxImageWidth);
	
	var spacerWidth = Math.floor(((jQuery("#maingallerydiv #photopane").width() - numberOfImageAcross * (imageMargin*2+maxImageWidth))) / 2);
	jQuery("#maingallerydiv #photopane #spacer").width(spacerWidth+"px");
};*/