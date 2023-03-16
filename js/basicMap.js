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
//Modify the leaflet map behaviours
let width; // NB – keep this as a global variable
//let popup; // keep this as a global variable
let mapPoint; // store the geoJSON feature so that we can remove it if the screen is resized
function setMapClickEvent() {
 // get the window width
 width = $(window).width();
// we use the bootstrap Medium and Large options for the asset location capture
// and the small and XS options for the condition option
// see here: https://www.w3schools.com/bootstrap/bootstrap_grid_system.asp
 if (width < 992) { 
//the condition capture –
//anything smaller than 992px is defined as 'medium' by bootstrap
 // remove the map point if it exists
 if (mapPoint){
 mymap.removeLayer(mapPoint);
 }
 // cancel the map onclick event using off ..
 mymap.off('click',onMapClick)
 // set up a point with click functionality
 // so that anyone clicking will add asset condition information
 setUpPointClick();
}
 else { // the asset creation page
 // remove the map point if it exists
 if (mapPoint){
 mymap.removeLayer(mapPoint);
 }
 // the onclik functionality of MAP pops up a blank asset creation form
 mymap.on('click',onMapClick);
}
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