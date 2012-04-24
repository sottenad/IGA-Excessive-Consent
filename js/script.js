/* Author: Steve Ottenad*/

/*Global Variables*/
var slideData;
var currentSlide;
var dataArr;
var bgRef;
var holderRef;
var slideRef;
var allowAdvance = true;

/*Settings*/
var pauseTime = 4000;

$(function(){

	$.ajax({
		url: 'slides.xml',
		success: function(data){
			var slideData = data;
			processSlides(slideData);
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log('Error:: ' + textStatus + errorThrown);
		}
	})
	
	$(window).resize(function(){	
		centerDevice();	
	 });
	centerDevice();
	
	$('.holder img').live('click', function(){
		if(allowAdvance){
			//We toggle the allowAdvance variable to false when we want to prevent manual slide advances.
			advanceSlide();
		}
	})
	
	$(document).keydown(function(e){
	    if (e.keyCode == 37) { 
			//Left Key Pressed
			previousSlide();
	    }else if( e.keyCode == 39){
	    	//right key pressed
	    	advanceSlide();
	    }
	});
	
})

$(window).load(function(){
	centerDevice();
})

function processSlides(data){
	var imageArr = new Array();
	var bgArr = new Array();
	var handArr = new Array();
	dataArr = new Array();
	$(data).find('slide').each(function(i){	
		var image = $(this).find('image').text();
		var background = $(this).find('background').text();
		var hand = $(this).find('hand').text();
		
		imageArr.push('img/screens/'+image);
		bgArr.push('img/bg/'+background);
		handArr.push('img/hand/'+hand);
		dataArr.push(this);
	});
	
	currentSlide = 0;	
	var item = dataArr[0];	
	var image = $(item).find('image').text();
	var background = $(item).find('background').text();
	var hand = $(item).find('hand').text();
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

/*Runs on window resize*/
function centerDevice(){
	if($(window).width() >700){
		var holder = $('.holder');
		$(holder).css({
		   left: ($(window).width() - $(holder).outerWidth())/1.8,
		   top:  ($(window).height() - $(holder).outerHeight())
		});
	 }
}

/*pass images to the preload function*/
function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
    });
}

function makeMarkup(index){
	var item = dataArr[index];
	var image = $(item).find('image').text();
	var background = $(item).find('background').text();
	var hand = $(item).find('hand').text();
	var timer = $(item).find('istimer').text();
	
	/*alter markup*/
	$('.bg').css('background','url(img/bg/'+background+')');
	$(holderRef).css('background', 'url(img/hand/'+hand+') top left');
	$(slideRef).attr('src', 'img/screens/'+image );
	
	//Always set this to true, and if it is a timer slide, we'll turn it off in processTimer();
	allowAdvance = true;
	processTimer(timer);
}

function processTimer(timer){
	if(timer == 'true'){
		allowAdvance = false;
		//Run advFromTimer function after 3000 milseconds (defined above)
		setTimeout(advanceSlide, pauseTime);
	}
}

function advanceSlide(){
	currentSlide +1 >= dataArr.length ? currentSlide = 0 : currentSlide++;
	makeMarkup(currentSlide);	
}
function previousSlide(){
	currentSlide -1 <= 0 ? currentSlide = dataArr.length : currentSlide--;
	makeMarkup(currentSlide);	
}




