/* Author: Steve Ottenad*/

/*Global Variables*/
var slideData;

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
	
})

function processSlides(data){
	
	
	$(data).find('slide').each(function(i){	
		var image = $(this).find('image').text();
		var background = $(this).find('background').text();
		var hand = $(this).find('hand').text();
		
		var output = '<div id="slide_'+i+'" class="outer">';
		output += '<div class="bg" style="background:url(img/bg/'+background+')">';	
		output += '<div class="holder" style="background:url(img/hand/'+hand+') top left">';	
		output += '<img src="img/screens/'+image+'" />';
		output += '</div></div></div>';
		
		
		$('#cont').append(output);
	})
	
	
}





