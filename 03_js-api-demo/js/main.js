

/**
 * button to trigger data from api
 *
 */
 
$('#startajax').on('click', function(event) {

    event.preventDefault();

    console.log('button clicked');

    $('#startajax').text('loading...').attr("disabled", "disabled");

    makeCity();

    $(this).fadeOut('slow');
});



/**
 * get data via API
 *
 */

function makeCity() {
    console.log('makeCity()');
    
    $.ajax({

            url: "http://api.wunderground.com/api/your-api-key-here/satellite/forecast/conditions/q/NY/New_York.json",
            dataType: 'jsonp',
            success: function(parsed_json) {

                console.log(parsed_json['forecast']['simpleforecast']['forecastday'][0])

                var satImg = parsed_json['satellite']['image_url'];
                var temp = parsed_json['current_observation']['temp_f'];
                var feels = parsed_json['current_observation']['feelslike_string'];
                var weather = parsed_json['current_observation']['weather'];
                var wind = parsed_json['current_observation']['wind_string'];
                var high = parsed_json['forecast']['simpleforecast']['forecastday'][0]['high']['fahrenheit'];
                var low = parsed_json['forecast']['simpleforecast']['forecastday'][0]['low']['fahrenheit'];

                var li = $('<li></li>'),
                    ul = $('#city_list');

                li.append('<p class ="title">' + 'New York' + '</p>');
                li.append('<img src=' + satImg + '/>');
                li.append('<p id="desc"> <strong>current weather:</strong> ' + weather + '</p>');
                li.append('<p id="desc"> <strong>temperature:</strong> ' + temp + '</p>');
                li.append('<p id="desc"> <strong>feels like:</strong> ' + feels + '</p>');
                li.append('<p id="desc"> <strong>wind:</strong> ' + wind + '</p>');
                li.append('<p id="desc"> <strong>high:</strong> ' + high + '</p>');
                li.append('<p id="desc"> <strong>low:</strong> ' + low + '</p>');

                ul.append(li);      


                console.log("satellite image url: " + satImg);

                console.log(parsed_json)
        
            }
    }) // END .ajax // notice there's no semi-colon ...
    .done(function() {
        console.log( "second success! getJSON is done." );
    })
    .fail(function( jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
    })    
    .always(function() {
        // run this stuff after, regardless of success or failure
    });

}; // END loadData()


