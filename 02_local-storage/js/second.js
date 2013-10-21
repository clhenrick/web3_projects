/*********************************************************************
 * set up the base map
*********************************************************************/

// store map config variables in an object
var config = {
  baselayer: new L.StamenTileLayer('toner'),
  initLatLng: new L.LatLng(40.67, -73.94),
  initZoom: 11,
  minZoom: 11,
  maxZoom: 16
}

// initialize map
var map = L.map('map', {minZoom: config.minZoom, maxZoom: config.maxZoom})

// add the Stamen base layer to the map 
map.addLayer(config.baselayer);

// set init map center and zoom
map.setView(config.initLatLng, config.initZoom);


/*********************************************************************
 * Add data to map
*********************************************************************/

// data variables stored here
var myData = {
  scrambled: "data/test_random.json",
  original: "data/test_output.json",
  myLayer: L.geoJson().addTo(map), // create new layer to store geojson
  polylinesTest: []

}


// create an object to store marker style properties
var geojsonMarkerOptions = {
	maxWidth: 400,
  radius: 10,
  fillColor: "rgb(255,0,195)",
  color: "#fff",
  weight: 2,
  opacity: 1,
  fillOpacity: 1
};

// create pop-ups for markers
function onEachFeature(feature, layer) {
        var popupContent,
            popupOptions = geojsonMarkerOptions;

        popupContent = feature.properties.t;

        // create a new variable to store Date in
        var time = new Date(0);
        // create a date by passing it the Unix UTC epoch
        time.setUTCSeconds(popupContent);

        // make the init popup content time
        popupContent = time;

        // console.log(popupContent);	

        layer.bindPopup("<b>Time:</b> " + time +
	                    "<br><b>Altitude: </b>" + feature.properties.alt + "meters"
	                    ,popupOptions);
}

// NOT YET WORKING...
// create line path features for marker animation
// polyLines created from pairs of latlons that share matching 't' value
function createLineFeatures(feature, feature_two) {

      // create a for loop to grab the first features lat lon
      for (i = 0, length = feature.features.length; i < length; i++){

        for (j = 0, length = feature_two.features.length; j < length; j++){ 

          var feature_t = feature.features[i].properties.t;
          var feature_two_t = feature_two.features[j].properties.t;

          // if the unix time is the same in both features
          if (feature_t === feature_two_t) {

            polyline = L.polyline([feature.features[i].geometry.coordinates, feature_two.features[j].geometry.coordinates])
            polylinesTest.push(polyline);

        } // end if
      
      } // end inner for loop
  
  } // end outer for loop

} // end createLineFeatures


// function to create geojson markers from data
function createMarkers(input_data) {

  // jquery ajax call to grab json data
  $.getJSON(input_data, function(json) {
      myData.myLayer.addData(json);
      //console.log(json.features);

  })
    .done(function (response) {

            console.log(response);

            newFeature = L.geoJson(response, {

                style: function (feature) {
                    return {
                        stroke: false,
                        fillColor: 'FFFFFF',
                        fillOpacity: 0
                    };
                },

                onEachFeature: onEachFeature,

            }).addTo(map);

        })

}


var scrambledGeo = createMarkers(myData.scrambled);
var origGeo = createMarkers(myData.original);

console.log(scrambledGeo); // returns undefined, how to return json?
console.log(myData.myLayer); // returns `e` (some deep level shit from the ajax call)


/*********************************************************************
 * create animated markers
*********************************************************************/

/* not yet working so commented out

  $.each(mydata.polylinesTest, function(i, routeLine) {
    var marker = L.animatedMarker(routeLine.getLatLngs(), {
      icon: bikeIcon,
      autoStart: false,
      onEnd: function() {
        $(this._shadow).fadeOut();
        $(this._icon).fadeOut(3000, function(){
          map.removeLayer(this);
        });
      }
    });

    map.addLayer(marker);

    $(marker._icon).hide().fadeIn(1000, function(){
      marker.start();
    });


*/