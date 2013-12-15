

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



// CORS url to test
var urlCORS = "http://api.wefeelfine.org:8080/ShowFeelings?display=xml&returnfields=imageid,feeling,sentence,posttime,postdate,posturl,gender,born,country,state,city,lat,lon,conditions&limit=500"

// CORS request
function createCORSRequest(method, url){
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr){
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined"){
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null;
    }
    return xhr;
}

var request = createCORSRequest("get", urlCORS);
if (request){
    request.onload = function(){
        //do something with request.responseText
    };
    request.send();
}

/**
 * get data via API
 *
 */

// function loadData(){

//     var url = "http://api.wefeelfine.org:8080/ShowFeelings?display=xml&returnfields=imageid,feeling,sentence,posttime,postdate,posturl,gender,born,country,state,city,lat,lon,conditions&limit=10" 

//     $.get( url, function( data ) {
//         console.log( data );
//     });

// }



function loadData() {
    console.log('loadData()');

    var items = [];

    var city = 'new york',
        state = 'new york',
        limit = '50',
        postdate = '2009-07-04',
        url = 'http://api.wefeelfine.org:8080/ShowFeelings?' + 'display=xml&returnfields=' + 'feeling' + '&state=' + state + '&city=' + city + '&postdate=' + postdate + '&limit=' + limit;

        // sample API call:
        // http://api.wefeelfine.org:8080/ShowFeelings?display=xml&returnfields=
        // imageid,feeling,sentence,posttime,postdate,posturl,gender,born,country,
        // state,city,lat,lon,conditions&city=new york city&limit=500

        // sample API call:
        // http://api.wefeelfine.org:8080/ShowFeelings?display=xml&returnfields=
        // imageid,feeling,sentence,posttime,postdate,posturl,gender,born,country,
        // state,city,lat,lon,conditions&city=detroit&limit=500

    console.log("the url is: ", url);

    // $.get( url, function( data ) {
    //     console.log( data );
    // });
    

    
    $.getJSON("data/feelings_500_nyc.json", function (data) {
        
        console.log('success! we got data: ');
        console.log(data);

        $.each(data.feelings.feeling, function (key, val) {

            console.log(key, val);

            $.each(val, function(key, val){

                if (key == "-feeling"){
    
                    items.push('<li id="' + key + '" >' + val + '</li>');

                }

            })


        }); // END .each()

        // add html to the page
        var output = items.join('');
        $('#results').html('<ul>' + output + '</ul>');


    }) // END .getJSON() // notice there's no semi-colon ...
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

} // END loadData()


