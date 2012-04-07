(function( $ ){
    		
    // Simple video player plugin
	$.fn.videoplayer = function(options) {
		
		return this.each(function(index) {        
			
			options.id = "video-" + index;
			
			var videotemplate = _.template('<video id="<%= id %>" class="video-js vjs-default-skin" controls width="640" height="264" <% if (poster) { %>poster="<%= poster %>"<% } %> preload="auto" data-setup="{}"><source type="video/mp4" src="<%= src %>"></video>');
				
			$(this).html(videotemplate(options));		
			
			_V_(options.id).ready(function(){
			
				if (options.events) {
					_.each(options.events, function(callback, event) {
						this.addEvent(event, callback);
					}, this);			
				}
			
			});
			
		});
		
	};
	
})( jQuery );

$(function() {
	
	/*
	
	EXAMPLE OF VIDEOPLAYER
	
	$("#video").videoplayer({
		poster: "http://video-js.zencoder.com/oceans-clip.jpg",
		src: "http://video-js.zencoder.com/oceans-clip.mp4",
		events:  { 
			"ended": function(event) {
				console.log(event);
			}
		}
	});	
		
	*/

});