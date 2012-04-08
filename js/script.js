/* Author: Steve Ottenad*/

/*Global Variables*/
var slideData;
var currentSlide;
var dataArr;

$(function(){

	$.ajax({
		url: 'slides.xml',
		crossDomain:true,
		success: function(data){
			var slideData = data;
			processSlides(slideData);
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log('Error:: ' + textStatus);
		}
	})
	
	$(window).resize(function(){	
		centerDevice();	
	 });
	centerDevice();
	
	$('.holder img').live('click', function(){
		currentSlide +1 >= dataArr.length ? currentSlide = 0 : currentSlide++;

		makeMarkup(currentSlide);	
	})
	
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
	
	
	preload(imageArr);
	preload(bgArr);
	preload(handArr);
}

/*Runs on window resize*/
function centerDevice(){
	if($(window).width() >700){
		var holder = $('.holder');
		$(holder).css({
		   left: ($(window).width() - $(holder).outerWidth())/2,
		   top:  ($(window).height() - $(holder).outerHeight())/2
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
	
	
	/*alter markup*/
	$('.outer .bg').css({'background':'url(img/bg/'+background});
	$('.outer .holder').css({'background': 'background:url(img/hand/'+hand+') top left'});
	$('.holder img').attr('src', 'img/screens/'+image );
}




