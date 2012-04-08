var popup;

function createPopup(thisnode, title, blurb, imgsrc, videosrc, x, y){
	if (popup) {
	  removePopup();
	}
	
  // if (!popup)
  // {
  	popup = $('<div id="popup"/>');
  	var $title = $('<h2>' + title + '</h2>');
	var $blurb = $('<h4>' + blurb + '</h4>');

  	popup.append("<a id='popup_link' href='" + videosrc + "'><img src='photos/" + imgsrc + "'></a>").append($title).append($blurb);
  	popup.append("<a id='closebox' class='close' href='#'>X</a>");

  	popup.css("top", y).css("left", x);

  	$("#content").append(popup).animate({opacity:1},'slow');
  	
  	$('#closebox').click(function (e) {
  		e.preventDefault();
  		removePopup();
  		//load video popup?
  	}); 
  // }
	
  // $("#content").append(popup).style("opacity", 1);
  //  
  // $("#popup h2").text(title);
  // $("#popup a#popup_link").attr("href", videosrc);
  // $("#popup img").attr("src", "photos/" + imgsrc);
  // 
  // popup.css("top", y).css("left", x);
  
}

function removePopup(){
	popup.animate({opacity:0},'slow');
	popup.remove();
	popup = null;
}
