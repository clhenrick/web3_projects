// create a variable to store Stamen 'toner' tiles
var layer = new L.StamenTileLayer("toner");

// initialize and set map center and zoom
var map = L.map('map', {
	center: new L.LatLng(40.67, -73.94),
	zoom: 11,
	minZoom: 11,
	maxZoom: 16
});

// add the Stamen layer to the map 
map.addLayer(layer);

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

// function that will create pop-ups
function onEachFeature(feature, layer) {
        var popupContent,
            popupOptions = geojsonMarkerOptions;

        popupContent = feature.properties.t;

        // create a new variable to store Date in
        var time = new Date(0);
        // create a date by passing it the Unix UTC epoch
        time.setUTCSeconds(popupContent);

        popupContent = time;

        console.log(popupContent);	

        layer.bindPopup("<b>Time:</b> " + time +
	                    "<br><b>Altitude: </b>" + feature.properties.alt + "meters"
	                    ,popupOptions);
}

// create new layer to store geojson
var myLayer = L.geoJson().addTo(map);

// to store lat lon of scrambled data
var test;

// jquery ajax call to grab json
$.getJSON("data/test_random.json", function(json) {
  myLayer.addData(json);

  var items = [];
  $.each( json, function(key, val){
  	items.push
  })

  //test.append(items);
  console.log(test);

})
	.done(function (response) {
	        scrambledGeo = L.geoJson(response, {

	            style: function (feature) {
	                return {
	                    stroke: false,
	                    fillColor: 'FFFFFF',
	                    fillOpacity: 0
	                };
	            },

	            onEachFeature: onEachFeature,

              pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, geojsonMarkerOptions)
              },

	        }).addTo(map);
	    })



