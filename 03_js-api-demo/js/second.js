/**
 * button to trigger data from api
 *
 */
 
$('#startajax').on('click', function(event) {
    event.preventDefault();
    console.log('button clicked');
    $('#startajax').text('loading...').attr("disabled", "disabled");
    
    for (property in geo) {
        makeCity('3c713ee529c6b167', feature1, feature2, feature3, property, geo[property], $('#city_list') );              
    }

    $(this).fadeOut('slow');
});


/*
 *** Wunderground API parameters ***
 * see http://www.wunderground.com/weather/api/d/docs
*/

var apiKey = 'your-api-key-here',
    feature1 = 'satellite',
    feature2 = 'forecast',
    feature3 = 'conditions',
    geo = {
        'NY' : 'New_York',
        'CA' : 'San_Francisco',
        'MI' : 'Detroit',
        'Germany' : 'Berlin',
        'FL' : 'Miami',
        'OR' : 'Portland',
        'Argentina' : 'Buenos_Aires',
        'WI' : 'Madison',
        'TX' : 'Houston',
        'LA' : 'New_Orleans'
    };

/**
 * get data via API
 *
 */

function makeCity(apiKey, feature1, feature2, feature3, geog1, geog2, ul){
    
    var url = 'http://api.wunderground.com/api/' + apiKey + '/' + feature1 + '/' + feature2 + '/' + feature3 + '/q/' + 
                geog1 + '/' + geog2 + '.json';

    $.ajax({

        url: url,
        dataType: 'jsonp',
        success: function(parsed_json) {
            //console.log(parsed_json);
            //console.log(parsed_json['forecast']['simpleforecast']['forecastday'][0])

            var satImg = parsed_json['satellite']['image_url'];
            var temp = parsed_json['current_observation']['temp_f'];
            var feels = parsed_json['current_observation']['feelslike_string'];
            var weather = parsed_json['current_observation']['weather'];
            var wind = parsed_json['current_observation']['wind_string'];
            var high = parsed_json['forecast']['simpleforecast']['forecastday'][0]['high']['fahrenheit'];
            var low = parsed_json['forecast']['simpleforecast']['forecastday'][0]['low']['fahrenheit'];

            li = $('<li></li>');

            li.append('<p class="title">' + geog2 + "</p>")
            li.append('<img src=' + satImg + '/>');
            li.append('<p id="desc"> current weather: ' + weather + '</p>');
            li.append('<p id="desc"> temperature: ' + temp + '</p>');
            li.append('<p id="desc"> feels like: ' + feels + '</p>');
            li.append('<p id="desc"> wind: ' + wind + '</p>');
            li.append('<p id="desc"> high: ' + high + '</p>');
            li.append('<p id="desc"> low: ' + low + '</p>');

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


