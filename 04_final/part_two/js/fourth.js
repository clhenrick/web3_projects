$(document).ready(function(){

	//define globals
	var postdates = [],
		newyork = [],
		detroit = [],
		colors = [],
		intersect = [];
	
	var detroit_data = "./data/detroit_500_feelings.json",
		newyork_data = "./data/feelings_500_nyc.json",
		colors_data = "./data/feelings_colors.json";

	var timeoutID;
	var pass = function(){};

	var parseData = function(url, city, callback){

	// grab detroit json data from server
		$.getJSON(url, function (data) {
		    
		    console.log('success! we got ' + city + ' data: ', data);

		    var array = data.feelings.feeling;
		    //var users = [];
		    console.log("the array: ", array);

		    // trying to figure out how to grab 1 feeling per user per date?
		    // for (var i = 0; i < array.length; i++){

		    // 	var toAdd = true;

		    // 	for (var j = 0; j < users.length; j++ ) {

		    // 		if (array[i]["-posturl"] == users[j]["-posturl"]) {

		    // 			toAdd = false;
		    // 		}

		    // 	}

		    // 	if (toAdd) {

		    // 		users.push(array[i]);
		    // 	}

		    // }

		   // console.log("users: ", users);

		   var _feelings = _.pluck(array, '-feeling');
		   var _unique = _.uniq(_feelings);

		   console.log("unique feelings test: ", _unique);

		   for (var i = 0; i < _unique.length; i++) {

		   		if (_unique[i] != undefined && _unique[i] != "") {

	            	city.push(_unique[i]);
		   		}

		   }


		   // other way of doing the above
		   // if (_unique != undefined){

			  //   $.each(array, function (key, val) {

			  //       //console.log(key, val);

			  //       $.each(val, function(key, val){

			  //           if (key == "-feeling"){


			  //           }

			  //       })
			  //   });


		   // }

		   //console.log('_feelings: ', _feelings);

		   console.log('city array: ', city);

		}) // END .getJSON() 
		.done(function() {
		    console.log( "second success! getJSON is done." );
		    callback(); // for when both city arrays are created
		})
		.fail(function( jqxhr, textStatus, error ) {
		    var err = textStatus + ", " + error;
		    console.log( "Request Failed: " + err );
		})  

	}

	    
	// find data that intersects both cities
	var intersect_data = function() {
		
		intersect = _.intersection(newyork, detroit);
		console.log("intersection of detroit and nyc: ", intersect);
		drawText(1, intersect,'intersect');

	}


	// load the hex color codes for top feelings
	var loadColors = function(url) {

		// load hex values for feelings and store them in an array
		$.getJSON(url, function(data) {

			var length = data.length;

			for (var i = 0; i < length; i++){

				//console.log("feeling: ", data[i].feeling, ", hex value: ", data[i].hex);

				colors.push(data[i]);

			}

			console.log("here's the colors array: ", colors);

			// $.each(data, function(key, val){

			// })

		})
		.done(function() {
		    console.log( "second success! feelings colors getJSON is done." );
		})
		.fail(function( jqxhr, textStatus, error ) {
		    var err = textStatus + ", " + error;
		    console.log( "Request Failed: " + err );
		})


	}


	// gimme a random percent
	var randomPercent = function(){    
	    var p = Math.floor(Math.random() * 100);
	    return p + '%';
	};


	// write some feelings with color to the browser
	function drawText(fps, city, target){

		setInterval(function(){
				
			var output = [],
				template = $('.template');
				//$('.template').remove();

				//id = "a" + posttime.pop();
				
				for (var i = 0, len = city.length; i <len; i++){

					var feeling = city.pop(); //.toUpperCase();

					var w = randomPercent(),
						h = randomPercent();

					var hue = Math.floor((Math.random() * 360) +1),
						s = Math.floor((Math.random() * 60) + 50),
						l = Math.floor((Math.random() * 60) + 20); 

					var clone = template.clone();
						clone.removeClass('template').addClass('feeling');
						clone.attr('id', 'a' + i)
							 .attr('z-index', i)
							 //.attr('title', feeling["-posturl"])
							 .css('top', '5')
							 .css('left', '10')
							 //.css('background', '#000')
							 .find('p').text(feeling);

					//console.log(feeling);


					for (var j = 0, len2 = colors.length; j < len2; j++) {

							//console.log(colors[j].hex);

							if (feeling == colors[j].feeling) {

								clone.css('background', '#' + colors[j].hex);

							// } else if (feeling != colors[j].feeling) {

							// 	clone.css('background', '#b2b2b2');
							 }
			
					} // end second for loop
					
					// output.push(clone);
					$('#' + target).append(clone);

				}

				// var w = $(window).width(),
				// 	h = $(window).height();

				// var randomW = Math.floor((Math.random()*w)+10);
				// var randomH = Math.floor((Math.random()*h)+10);

			
		}, 2000/fps);

	} //end function drawText

	loadColors(colors_data);

	parseData(detroit_data, detroit, pass);
	parseData(newyork_data, newyork, intersect_data);


	drawText(1, detroit, 'results');
	drawText(1, newyork, 'results2');

	//timeoutID = setTimeout(intersect_data(), 5000);

});






