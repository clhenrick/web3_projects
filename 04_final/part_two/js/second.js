// grab json data from server
$.getJSON("data/feelings_500_nyc.json", function (data) {
    
    console.log('success! we got data: ');
    console.log(data);

    $.each(data.feelings.feeling, function (key, val) {

        //console.log(key, val);

        $.each(val, function(key, val){

            if (key == "-feeling"){

                feelings.push(val);

            }

        })
    }); // END .each()

}) // END .getJSON() // notice there's no semi-colon ...
.done(function() {
    console.log( "second success! getJSON is done." );
})
.fail(function( jqxhr, textStatus, error ) {
    var err = textStatus + ", " + error;
    console.log( "Request Failed: " + err );
})    
	
// global to store strings
var feelings = [],
	posttime = [];

var mouseX, mouseY;

$(document).mousemove(function(e){
	mouseX=e.pageX; //pageX pageY built-in variables equivalent to width and height
	mouseY=e.pageY;
});


var randomPercent = function(){    
    var p = Math.floor(Math.random() * 100);
    return p + '%';
};

function drawText(fps){

	setInterval(function(){
			
		var output = [],
			template = $('.template');
			$('.template').remove();

			//id = "a" + posttime.pop();
			
			for (var i = 1, len = feelings.length; i <len; i++){
	
				var feeling = feelings.pop().toUpperCase();

				var w = randomPercent(),
					h = randomPercent();

				var hue = Math.floor((Math.random() * 360) +1),
					s = Math.floor((Math.random() * 60) + 50),
					l = Math.floor((Math.random() * 60) + 20); 

				var clone = template.clone();
					clone.removeClass('template').addClass('feeling');
					clone.attr('id', 'a' + i)
						 .attr('z-index', i)
						 .css('top', '5')
						 .css('left', '10')
						 .css('background', 'hsla(' + hue + ', ' + s + '%, ' + l + '%, 0.7)')
						 .find('p').text(feeling);

				//$('#a' + i).attr('width', '100%');
				//$('#a' + i).attr('z-index', i);

				//console.log(clone);
				
				output.push(clone);
				$('#results').append(output);
			}

			// var w = $(window).width(),
			// 	h = $(window).height();

			// var randomW = Math.floor((Math.random()*w)+10);
			// var randomH = Math.floor((Math.random()*h)+10);

		
	}, 2000/fps);

}

drawText(1);


