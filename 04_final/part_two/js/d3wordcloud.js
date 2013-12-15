/**
 * button to trigger data from api
 *
 */
 
$('#startajax').on('click', function(event) {
    event.preventDefault();
    console.log('button clicked');
    $('#startajax').text('loading...').attr("disabled", "disabled");
    loadData();
});

function loadData() {

    console.log('loadData() called');

    var items = [];

    $.getJSON("data/feelings_500_nyc.json", function (data) {
        
        console.log('success! we got data: ');
        console.log(data);

        $.each(data.feelings.feeling, function (key, val) {

            //console.log(key, val);

            $.each(val, function(key, val){

                if (key == "-feeling"){

                	items.push(val);

                }

            })


        }); // END .each()

        // add html to the page
        var output = items.join('');
        //$('#results').html('<ul>' + output + '</ul>');


    }) // END .getJSON() // notice there's no semi-colon ...
    .done(function() {
        console.log( "second success! getJSON is done." );
        console.log(items);

	 	var fill = d3.scale.category20(),
	 		w = $(window).width(),
	 		h = $(window).height(),
	 		tw = w/2,
	 		th = h/2;

		d3.layout.cloud().size([w,h])
		  .words(items.map(function(d) {
		    return {text: d, size: 10 + Math.random() * 90};
		  }))
		  .padding(0)
		  .rotate(function() { return ~~(Math.random() * 2) * 90; })
		  .font("Impact")
		  .fontSize(function(d) { return d.size; })
		  .on("end", draw)
		  .start();   	


		function draw(words) {
			d3.select("body").append("svg")
			    .attr("width", w)
			    .attr("height", h)
			  .append("g")
			    .attr("transform", "translate(800,500)")
			  .selectAll("text")
			    .data(words)
			  .enter().append("text")
			    .style("font-size", function(d) { return d.size + "px"; })
			    .style("font-family", "Impact")
			    .style("fill", function(d, i) { return fill(i); })
			    .attr("text-anchor", "middle")
			    .attr("transform", function(d) {
			      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
			    })
			    .text(function(d) { return d.text; });
		}

    })
    .fail(function( jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
    })    
    .always(function() {
        // run this stuff after, regardless of success or failure
    });

} // END loadData()

