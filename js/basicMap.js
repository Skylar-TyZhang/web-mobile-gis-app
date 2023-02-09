// enforce the use of variable names
"use strict";

// global vairalbe to store the map
// create an event detector to wait for the user's click event and then use the popup to show them where they clicked
let mymap;

function loadLeafletMap() {
    console.log('This is at the start of the first function')
    mymap = L.map('mapid').setView([51.505, -0.09], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy;<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mymap);
    console.log('Map created')
    // now call the code to add the markers
    //addBasicMarkers();
    // add the click event detector to the map
    mymap.on('click', onMapClick);
}// end code to add the leaflet map


// create a custom popup as a global variable
let popup = L.popup();
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent('You click the map at' + e.latlng.toString())
        .openOn(mymap);
}

/*let testMarkerPink = L.AwesomeMarkers.icon({
    icon: 'play',
    markerColor: 'pink'
});
let testMarkerGreen = L.AwesomeMarkers.icon({
    icon: 'play',
    markerColor: 'green'
});
function addBasicMarkers() {
    // add circle 
    console.log('addBasicMarker function')
    L.circle([51.508, -0.11], 5000, {
        color: 'green',
        fillColor: '#f03',
        fillOpacity: 0.8
    }).addTo(mymap).bindPopup('This is a circle.');

    console.log('added a circle');

    // add a polygon
    let myPolygon = L.polygon([
        [51.709, -0.10],
        [51.703, 0.07],
        [51.22, 0.07],
        [51.22, -0.057]
    ], {
        color: 'orange',
        fillColor: '#f03',
        fillOpacity: 0.5
    }).addTo(mymap).bindPopup('This is a polygon in 2023.');
    console.log('data item created');
    // create a geoJSON feature -
    let geojsonFeature = {
        "type": "Feature",
        "properties": {
            "name": "London",
            "popupContent": "This is where UCL is based. We have on campus and off campus activity."
        },
        "geometry": {
            "type": "Point",
            "coordinates": [-0.133583, 51.524776]
        }
    };
    // add it to the map
    L.geoJSON(geojsonFeature, {
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, { icon: testMarkerPink });
        }
    }).addTo(mymap).bindPopup('<b>' + geojsonFeature.properties.name + '' + geojsonFeature.properties.popupContent + '<b>');


}// end code to add the basic markers
*/