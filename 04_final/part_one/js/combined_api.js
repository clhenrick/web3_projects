$(document).ready(function(){

    var postdates = [];

    var newArray = [],
        newObj = {};
        newObj.weekEndDate = ""

    var newyork_data = "./data/new-york_listings.json",
        detroit_data = "./data/detroit-listings.json";

    var newyork = "results",
        detroit = "results2";



    var parseData = function(url, target){

        //grab New York json data for Trulia
       $.getJSON(url, function(data){
        
            var listings = data.TruliaWebServices.response.TruliaStats.listingStats.listingStat;

            var start = "2012-01-01",
                end = "2012-12-31";

            console.log("here's the trulia data: ", listings);
            //parseData(data);

            for (i=0; i <listings.length; i++){

                if (listings[i].weekEndingDate > start && listings[i].weekEndingDate < end) {
                    
                    //console.log(listings[i]);

                    var meanValue = listings[i].listingPrice.subcategory[0].averageListingPrice;

                    var endDate = listings[i].weekEndingDate;

                    console.log(meanValue);

                    drawShit(meanValue, endDate, target);

                }
            }

        })
        .done(function() {
            console.log( "getJSON for Trulia is done." );
        })
        .fail(function( jqxhr, textStatus, error ) {
            var err = textStatus + ", " + error;
            console.log( "Request Failed: " + err );
        }); 


    }


    // grab json data from server
    $.getJSON("data/feelings_500_nyc.json", function (data) {
        
        console.log('we feel fine data: ', data);

        // for (i=0; i<data.feelings.feeling.length; i++) {
        //  console.log([i].-postdate);
        // }

        var startTime = 1325289600,
            endTime = 1356912000,
            weeks = [];

        var inc = 604800;

        var feelings = data.feelings.feeling;

        //console.log(feelings);

        for (i = startTime; i < endTime; i = i + inc ) {

            var date = new Date();

            date.setTime(i*1000);

            weeks.push(date);
            //console.log(weeks.length);

            for (j = 0; j <feelings.length; j++){

                if (feelings[j]["-posttime"] > i && feelings[j]["-feeling"] != undefined && feelings[j]["-posttime"] < endTime) {
                    
                    // console.log(feelings[j]["-feeling"], feelings[j]["-posttime"]); 

                    if (feelings[j]["-posttime"]>startTime && feelings[j]["-posttime"]<(i+inc)){

                        //console.log(feelings[j]["-feeling"], feelings[j]["-posttime"]);

                        //newArray.push()
                    }

                }

            }

        }

    }) // END .getJSON() // notice there's no semi-colon ...
    .done(function() {
        console.log( "second success! getJSON is done." );
    })
    .fail(function( jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
    });

    
    function drawShit(mean, endDate, target){

        //console.log(mean);

        var output = [];
            template = $('.template');

        var clone = template.clone();
        clone.removeClass('template').addClass('listing')
             .css('width', mean/5000)
             .css('height', mean/5000)
             .css('background','rgb(0,255,0)')
             .attr('id', endDate)
             .find('p').text("average listing price: " + mean);
        
        $('#results p').css('line-height', (mean/5000) -20 + 'px' );

        output.push(clone);
        $('#' + target).append(output);

    }    

    parseData(newyork_data, newyork);
    parseData(detroit_data, detroit);


})
