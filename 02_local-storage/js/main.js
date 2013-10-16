
// create a variable to load Stamen 'toner' tiles
var layer = new L.StamenTileLayer("toner");

// initialize and set map center and zoom
var map = L.map('map', {
	center: new L.LatLng(40.67, -73.94),
	zoom: 12
});

// create the map 
map.addLayer(layer);

// grab the processed GeoJSON through ajax call
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
    color: "#000",
    weight: 0,
    opacity: 1,
    fillOpacity: 1
};

// load the geojson to the map
// var myLayer = L.geoJson().addTo(map);
// 	myLayer.addData(json);

// load the geojson to the map with marker styling
L.geoJson(geojsonFeature, {
	pointToLayer: function (feature, latlng) {
		return L.circleMarker(latlng, geojsonMarkerOptions)
	}
}).addTo(map);