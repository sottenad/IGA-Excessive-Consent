/* Author: Steve Ottenad*/

/*Global Variables*/
var slideData;
var currentSlide;
var dataArr;
var bgRef;
var holderRef;
var slideRef;
var allowAdvance = true;
var timer;

/*Settings*/
var pauseTime = 4000;



$(function(){

	/*Detect iphones, we need to serve slightly different CSS to account for safari chrome*/
	if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
		$('body').addClass('iphone');
	}


	$(document).live('touchmove', function(e){
		e.preventDefault(); 
	})


	processSlides(slideData);

	
	$('.holder img').live('click', function(){
		if(allowAdvance){
			//We toggle the allowAdvance variable to false when we want to prevent manual slide advances.
			advanceSlide();
		}
	})
	
	$(document).keydown(function(e){
	
	    if (e.keyCode == 37) { 
			//Left Key Pressed
			clearTimeout(timer);
			previousSlide();
	    }else if( e.keyCode == 39){
	    	//right key pressed
	    	clearTimeout(timer);
	    	advanceSlide();
	    }
	});
	
})

function processSlides(data){

	var imageArr = new Array();
	var bgArr = new Array();
	var handArr = new Array();
	dataArr = new Array();
	$(data.slide).each(function(i){	
		var image = this.image;
		var background = this.background;
		var hand = this.hand;
		
		imageArr.push('img/screens/'+image);
		bgArr.push('img/bg/'+background);
		handArr.push('img/hand/'+hand);
		dataArr.push(this);
	});
	
	currentSlide = 0;	
	var item = dataArr[0];	
	var image = item.image;
	var background = item.background;
	var hand = item.hand;
	var output = '<div class="outer">';
	output += '<div class="bg" style="background:url(img/bg/'+background+')">';	
	output += '<div class="holder" style="background:url(img/hand/'+hand+') top left">';	
	output += '<img src="img/screens/'+image+'" />';
	output += '</div></div></div>';	
	$('#cont').html(output);
	
	bgRef = $('.bg');
	holderRef = $('.holder');
	slideRef = $('.holder img');
	
	preload(imageArr);
	preload(bgArr);
	preload(handArr);
}

/*pass images to the preload function*/
function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
    });
}

function makeMarkup(index){
	var item = dataArr[index];
	var image = item.image;
	var background = item.background;
	var hand = item.hand;
	var istimer = item.istimer;
	
	/*alter markup*/
	$('.bg').css('background','url(img/bg/'+background+')');
	$(holderRef).css('background', 'url(img/hand/'+hand+') top left');
	$(slideRef).attr('src', 'img/screens/'+image );
	
	//Always set this to true, and if it is a timer slide, we'll turn it off in processTimer();
	allowAdvance = true;
	processTimer(istimer);
}

function processTimer(istimer){
	if(istimer == 'true'){
		allowAdvance = false;
		clearTimeout(timer);
		timer = setTimeout(advanceSlide, pauseTime);
	}
}

function advanceSlide(){
	currentSlide +1 >= dataArr.length ? currentSlide = 0 : currentSlide++;
	makeMarkup(currentSlide);	
}
function previousSlide(){
	currentSlide -1 <= 0 ? currentSlide = dataArr.length-1 : currentSlide--;
	makeMarkup(currentSlide);	
}


window.addEventListener('orientationchange', function (evt) {
    switch(window.orientation) {
        case 0: // portrait
        case 180: // portrait
        case 90: // landscape
        case -90: // landscape
    }
    //alert(window.orientation);
    window.scrollTo( 0, 1 );
}, false);



/*
  * Normalized hide address bar for iOS & Android
  * (c) Scott Jehl, scottjehl.com
  * MIT License
*/
(function( win ){
	var doc = win.document;

	// If there's a hash, or addEventListener is undefined, stop here
	if( !location.hash && win.addEventListener ){

		//scroll to 1
		
		var scrollTop = 1,
			getScrollTop = function(){
				return win.pageYOffset || doc.compatMode === "CSS1Compat" && doc.documentElement.scrollTop || doc.body.scrollTop || 0;
			},

			//reset to 0 on bodyready, if needed
			bodycheck = setInterval(function(){
				if( doc.body ){
					clearInterval( bodycheck );
					scrollTop = getScrollTop();
					win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
				}	
			}, 15 );

		win.addEventListener( "load", function(){
			setTimeout(function(){
				//at load, if user hasn't scrolled more than 20 or so...
				if( getScrollTop() < 20 ){
					//reset to hide addr bar at onload
					win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
				}
			}, 0);
		} );
	}
})( this );



