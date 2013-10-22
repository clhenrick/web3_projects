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
  dataOrig: [],
  dataNew: [],
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

  console.log('called createLineFeatures');

  // create a for loop to grab the first features lat lon
  for (i = 0; i < feature.length; i++){

    //console.log(feature[i].properties.t);

    for (j = 0; j < feature_two.length; j++){ 

      //console.log(feature_two[j].properties.t);
      //console.log(feature_two[j]);

      // if the unix time is the same in both features
      if (feature[i].properties.t == feature_two[j].properties.t) {

        console.log(feature[i].geometry.coordinates + feature_two[j].geometry.coordinates);

        var coordinatesA = feature[i].geometry.coordinates,
            coordinatesB = feature_two[j].geometry.coordinates,
            polyline = L.polyline([[coordinatesA], [coordinatesB]]);
        
        console.log(polyline); // returns weird `e` values

        myData.polylinesTest.push(polyline);

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

  for (var i = 0; i < json.features.length; i++){

    if (json.features[i].geometry.coordinates[0] == json.features[i].properties.lon){

     // console.log(json.features[i].geometry.coordinates);
      newPoint = json.features[i];
      myData.dataOrig.push(newPoint);

    }
  }

  for (var i = 0; i < json.features.length; i++){

    if (json.features[i].geometry.coordinates[0] != json.features[i].properties.lon){

      //console.log(json.features[i].geometry.coordinates);
      newPoint = json.features[i];
      myData.dataNew.push(newPoint);

    }
  }

  })
    .done(function (response) {

            //console.log(response);

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


//var scrambledGeo = createMarkers(myData.scrambled);
//var origGeo = createMarkers(myData.original);

setTimeout(function() {
 // createLineFeatures(myData.dataOrig, myData.dataNew)
}, 2000);

/*********************************************************************
 * create animated markers
*********************************************************************/

// what the polylines should look like...
var routelines = [
  L.polyline([[40.66893768310547,-73.97364044189453],[40.700906724998084,-73.982159924856]]),
  L.polyline([[40.66240692138672,-73.96121215820312],[40.67959172823107,-73.93065222433161]]),
  L.polyline([[40.666404724121094,-73.96212005615234],[40.6492585313864,-73.92650879888541]]),
  L.polyline([[40.70763397216797,-73.96053314208984],[40.68801800482941,-73.89643122463292]]),
  L.polyline([[40.72077941894531,-73.96383666992188],[40.69775273343673,-73.91169387790706]]),
  L.polyline([[40.701236724853516,-73.96379852294922],[40.738112456274926,-73.99835990747752]])
]

  $.each(routelines, function(i, routeLine) {
    var marker = L.animatedMarker(routeLine.getLatLngs(), {
      //icon: bikeIcon,
      autoStart: false,
      onEnd: function() {
        $(this._shadow).fadeOut();
      }
    });

    map.addLayer(marker);

    $(marker._icon).hide().fadeIn(1000, function(){
      marker.start();
    });
  });