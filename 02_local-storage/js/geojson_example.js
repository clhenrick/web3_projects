
		var map = L.map('map').setView([39.74739, -105], 13);

		L.tileLayer('http://{s}.tile.cloudmade.com/{key}/22677/256/{z}/{x}/{y}.png', {
			attribution: 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2012 CloudMade',
			key: 'BC9A493B41014CAABB98F0471D759707'
		}).addTo(map);

		var baseballIcon = L.icon({
			iconUrl: 'baseball-marker.png',
			iconSize: [32, 37],
			iconAnchor: [16, 37],
			popupAnchor: [0, -28]
		});

		function onEachFeature(feature, layer) {
			var popupContent = "<p>I started out as a GeoJSON " +
					feature.geometry.type + ", but now I'm a Leaflet vector!</p>";

			if (feature.properties && feature.properties.popupContent) {
				popupContent += feature.properties.popupContent;
			}

			layer.bindPopup(popupContent);
		}

		L.geoJson([bicycleRental, campus], {

			style: function (feature) {
				return feature.properties && feature.properties.style;
			},

			onEachFeature: onEachFeature,

			pointToLayer: function (feature, latlng) {
				return L.circleMarker(latlng, {
					radius: 8,
					fillColor: "#ff7800",
					color: "#000",
					weight: 1,
					opacity: 1,
					fillOpacity: 0.8
				});
			}
		}).addTo(map);

		L.geoJson(freeBus, {

			filter: function (feature, layer) {
				if (feature.properties) {
					// If the property "underConstruction" exists and is true, return false (don't render features under construction)
					return feature.properties.underConstruction !== undefined ? !feature.properties.underConstruction : true;
				}
				return false;
			},

			onEachFeature: onEachFeature
		}).addTo(map);

		var coorsLayer = L.geoJson(coorsField, {

			pointToLayer: function (feature, latlng) {
				return L.marker(latlng, {icon: baseballIcon});
			},

			onEachFeature: onEachFeature
		}).addTo(map);

	