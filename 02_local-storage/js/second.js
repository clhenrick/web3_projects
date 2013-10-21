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
  myLayer: L.geoJson().addTo(map) // create new layer to store geojson
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


// create line path features for marker animation
function createLineFeatures(first_feature, second_feature) {

  // create a for loop to grab the first features lat lon
  for (i = 0, length = first_feature.length; i < length; i++){
    console.log(feature.geometry.coordinates);

      var items = [];
      $.each( json, function(key, val){
        items.push
      })

  }
}


// function to create geojson markers from data
function createMarkers(input_data) {

  // jquery ajax call to grab json data
  $.getJSON(input_data, function(json) {
    myData.myLayer.addData(json);
  })
    .done(function (response) {
            mobileGeo = L.geoJson(response, {

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

//myLayer.addData(geojsonFeature);

var scrambledGeo = L.geoJson().addTo(map);
var origGeo = L.geoJson().addTo(map);

    scrambledGeo = createMarkers(myData.scrambled);
    origGeo = createMarkers(myData.original);

// createLineFeatures(scrambledGeo, origGeo);

console.log(feature);



