try {
	window.onload = function() {
		var script = document.createElement("script");
		script.src = "https://code.jquery.com/jquery-2.1.4.min.js";
		document.head.appendChild(script);
	};
} catch(e) {
	console.log(e);
}
document.addEventListener('click', function(e) {
	console.log('electron:click');
    e = e || window.event;
    var target = e.target || e.srcElement;
		var element = target;
	
		while(element.parentNode.tagName !='HTML' && element.parentNode.tagName != 'A' && target.tagName != 'HTML') {
			element = element.parentNode;
		}
	
		if(element.tagName != 'HTML') {
			var link = element.parentNode;
			if(link.tagName == 'A') {
				if(link.target.toLowerCase() == "_blank") {
					e.preventDefault();
					
					var json = {
						action: "blank",
						url: link.href
					};
					
					console.log('electron:' + JSON.stringify(json));
				}
			}
		}
}, false);
document.addEventListener("DOMContentLoaded", function(event) {
	function sendPageInfo() {var favicon = "", themeColor = "";
		for(var i = 0; i < document.getElementsByTagName("link").length; i++) {
			if( (document.getElementsByTagName("link")[i].rel.toLowerCase() == 'shortcut icon') || (document.getElementsByTagName("link")[i].rel.toLowerCase() == 'icon')) {
				favicon = document.getElementsByTagName("link")[i].href;
			}
		}
		for(var i = 0; i < document.getElementsByTagName("meta").length; i++) {
			if(document.getElementsByTagName("meta")[i].name.toLowerCase() == 'theme-color') {
				themeColor = document.getElementsByTagName("meta")[i].content;
			}
		}

		var pageInfo = {
			action: "Pageinfo",
			url: document.location.origin,
			favicon: favicon,
			themeColor: themeColor
		};

		console.log('electron:' + JSON.stringify(pageInfo));
	}
	
	sendPageInfo();
	setTimeout(sendPageInfo, 2000);
});