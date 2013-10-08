
// create a layer for stamen basemaps
var layer = new L.StamenTileLayer("toner");

// initialize and set map center and zoom
var map = L.map('map', {
	center: new L.LatLng(40.67, -73.94),
	zoom: 12
});

map.addLayer(layer);

// add base map tiles
// L.tileLayer('')

// add GeoJSON layer *** need to figure out how to convert plain JSON to GeoJSON ***
var myLayer = L.geoJson().addTo(map);
	myLayer.addData(data/test.json);