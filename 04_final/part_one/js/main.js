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



/**
 * get data via API
 *
 */

function loadData() {
    console.log('loadData()');

    var items = [];

    var url = "./php/grab_url.php"
    //var url = "http://api.wefeelfine.org:8080/ShowFeelings?display=xml&returnfields=imageid,feeling,sentence,posttime,postdate,posturl,gender,born,country,state,city,lat,lon,conditions&limit=500";
        // some APIs accept parameters: 
        // var parameters = { }; // optional api parameters
        // $.getJSON(url, parameters, function (data) { // with parameters
    
    $.getJSON(url, function (data) {
        
        console.log('success! we got data: ');
        console.log(data);

        for (var i = 0; i < data.length; i++) {

            console.log(data[i].feeling);
            items.push('<li>' + data[i].feeling + '</li>');


        }

        // $.each(data.feeling, function (key, val) {

        //     console.log(key, val);
        //     items.push('<li id="' + key + '" >' + val + '</li>');

        // }); // END .each()

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

}; // END loadData()


