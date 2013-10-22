
// create a variable to load Stamen 'toner' tiles
var layer = new L.StamenTileLayer("toner");

// initialize and set map center and zoom
var map = L.map('map', {
	center: new L.LatLng(40.67, -73.94),
	zoom: 11
});

// create the map 
map.addLayer(layer);

// on each feature use feature data to create a pop-up
function onEachFeature(feature, layer) {
        
    var popupContent;
    popupContent = feature.properties.t;

    // create a new variable to store Date in
    var time = new Date(0);
    // create a date by passing it the Unix UTC epoch
    time.setUTCSeconds(popupContent);

    popupContent = time;

    console.log(popupContent);
    //return time;
    
    layer.bindPopup(popupContent);
}

// grab original GeoJSON
var geojsonOriginal = (function() {
    var json = null;
    $.ajax({
        'url': "/data/test_output.json",
        'dataType': "json",
        'jsonpCallback': 'getJson',
        'success': function (data) {
            json = data;
        }
    });
    return json;
})();


// grab the processed & scrambled GeoJSON through an ajax call
var geojsonFeature = (function() {
        var json = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': "/data/test_random.json",
            'dataType': "json",
            'success': function (data) {
                json = data;
            }
        });
        return json;
    })();

// create an object to store marker style properties
var geojsonMarkerOptions = {
    radius: 10,
    fillColor: "rgb(255,0,195)",
    color: "#fff",
    weight: 2,
    opacity: 1,
    fillOpacity: 1
};


// load the geojson to the map with marker styling
L.geoJson(geojsonFeature, {

    style: function (feature) {
        return feature.properties && feature.properties.style;
    },

    onEachFeature: onEachFeature,

}).addTo(map);

