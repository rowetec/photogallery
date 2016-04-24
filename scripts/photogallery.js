jQuery(function(){
	
	defaultMaxImageWidth = 200;
	defaultMaxImageHeight = 200;
	maxImageWidth = defaultMaxImageWidth;
	maxImageHeight = defaultMaxImageHeight;
	imageMargin = 20;
	photoPaneWidth = jQuery("#maingallerydiv #photopane").width;
	galleryImages = [];
	loadGallery();
	
	var resizeTimer;
	
	//Listener for windows size change
	jQuery(window).on('resize',function(){
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(resizeGallery, 250, true);
	});
	//Listener for thumbnail size change
	jQuery("#maingallerydiv #content #filter #thumbsize .btn").click(function(){
		var btnVal = jQuery(this).html();
		maxImageWidth = defaultMaxImageWidth * (btnVal - 0.75 - (0.25 * (btnVal - 1)));
		maxImageHeight = defaultMaxImageHeight * (btnVal - 0.75 - (0.25 * (btnVal - 1)));
		jQuery(this).addClass("active").siblings().removeClass("active");
		resizeGallery(true,true);
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
			var id = "thumb_"+i;
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
			galleryImages[i] = new galleryImage (item.filename, item.width, item.height, orientation, dimensionRatio, thumbHeight, thumbWidth,id);
			i++;
		});
		galleryImages.forEach(function(item){
			html = html + '<div id="'+item.id+'" class="albumimagecontainer"><div class="albumimagehorizontalalign"><div class="albumimage"><img src="photos/thumbs/'+item.filePath+'" height="'+item.thumbHeight+'" width="'+item.thumbWidth+'" /></div></div></div>';
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
	.children(".albumimagehorizontalalign").width(object.children(".albumimagehorizontalalign").children(".albumimage").children("img").width())
	.children(".albumimage").width(object.children(".albumimagehorizontalalign").children(".albumimage").children("img").width()).height(object.children(".albumimage")
	.children("img").height()).show()
	.children("img").fadeIn(100);
	setTimeout(function(){
		showImages(jQuery(object).next());
	},10);
}

function galleryImage (filePath,width,height,orientation,dimensionRatio,thumbHeight,thumbWidth,id){
	this.filePath 		= filePath;
	//this.galleryId 	= galleryId;
	this.width	 		= width;
	this.height			= height;
	this.orientation	= orientation;
	this.dimensionRatio	= dimensionRatio;
	this.thumbHeight	= thumbHeight;
	this.thumbWidth		= thumbWidth;
	//this.dateTime		= dateTime;
	this.id				= id;
}

function resizeGallery(animate,resizeThumbs) {
	//jQuery(window).off("resize");
	var numberOfImagesAcross = Math.floor((jQuery("#maingallerydiv #photopane").width()-15)/(imageMargin*2+maxImageWidth));
	
	
	var spacerWidth = Math.floor((jQuery("#maingallerydiv #photopane").width() - numberOfImagesAcross * (imageMargin*2+maxImageWidth)) / 2 + imageMargin/2);
	var i = 0;
	var column = 1;
	var row = 1;
	
	if (resizeThumbs){
		resizeThumbnails();
	}
	
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
		if (resizeThumbs){
			jQuery(this).stop().animate({
					"left" : fromLeft + "px",
					"top" : fromTop + "px",
					"width" : maxImageWidth + "px",
					"height" : maxImageWidth + "px"
				})
		}
		else {
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
		}
		i++;
		column++;
	});

}

function resizeThumbnails(){
	galleryImages.forEach(function(item){
		if (item.orientation == "landscape"){
			item.thumbWidth = maxImageWidth;
			item.thumbHeight = maxImageWidth * item.dimensionRatio;
		}
		else{
			item.thumbHeight = maxImageHeight;
			item.thumbWidth = maxImageHeight * item.dimensionRatio;
		}
		jQuery("#" + item.id + " img").stop().animate({
			"width" : item.thumbWidth + "px",
			"height" : item.thumbHeight + "px"
		});
		jQuery("#" + item.id + " .albumimagehorizontalalign").stop().animate({
			"width" : item.thumbWidth + "px"
		});
		jQuery("#" + item.id + " .albumimage").stop().animate({
			"width" : item.thumbWidth + "px",
			"height" : item.thumbHeight + "px"
		});
	})
}

