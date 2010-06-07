
if (window == top) {
  chrome.extension.onRequest.addListener(function(req, sender, sendResponse) {
    	addScrollBtnn();
  });
}

var SCROLLER_ID = 'sv_scroll_to_top',
	bIsVisible = false;

var scrollToTop = function(){
	var node = document.body;
	node.scrollTop -= 50;
	if(node.scrollTop>0){
		setTimeout(function(){
			scrollToTop();
		},10);
	}
};

var fadeIn = function(_ele){
	_ele.style.opacity=0.0;
	
	for(var vv=1;vv<11;vv++){
		(function(xx){
			setTimeout(function(){
				_ele.style.opacity=(xx/20);
			},50*xx);
		})(vv);
	}
	
};

var checkForDisplay = function(){
	if(document.body.scrollTop > 110){
		document.getElementById(SCROLLER_ID).style.display = 'inline';
		if(!bIsVisible) fadeIn(document.getElementById(SCROLLER_ID));
		
		bIsVisible = true;
	}else{
		document.getElementById(SCROLLER_ID).style.display = 'none';
		
		bIsVisible = false;
	}
};

var addScrollBtnn = function() {
  	window.addEventListener('scroll',checkForDisplay);
	var outOpacity = 0.5,
		img = document.createElement('img');
	img.src='http://stupidventures.com/images/extensions/jump_to_top_arrow.png';
	img.style.opacity = outOpacity;
	img.style.position = 'fixed';
	img.style.zIndex = 2147483647;
	img.style.top = '20px';
	img.style.left = (document.body.offsetWidth - 65) + 'px';
	img.style.display = 'none';
	img.id = SCROLLER_ID;
	img.addEventListener('mouseover',function(){
		this.style.opacity = 1;
	});
	img.addEventListener('mouseout',function(){
		this.style.opacity = outOpacity;
	});
	img.addEventListener('click',function(){
		this.style.opacity = 1;
		scrollToTop();
	});
	document.body.appendChild(img);
}