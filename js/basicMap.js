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
        if (mapPoint) {
            mymap.removeLayer(mapPoint);
        }
        // cancel the map onclick event using off ..
        mymap.off('click', onMapClick)
        // set up a point with click functionality
        // so that anyone clicking will add asset condition information
        setUpPointClick();
    }
    else { // the asset creation page
        // remove the map point if it exists
        if (mapPoint) {
            mymap.removeLayer(mapPoint);
        }
        // the onclik functionality of MAP pops up a blank asset creation form
        mymap.on('click', onMapClick);
    }
};


//Create a point and set up the onlick behaviour for the point
function setUpPointClick() {
    // create a geoJSON feature (in your assignment code this will be replaced
    // by an AJAX call to load the asset points on the map
    let geojsonFeature = {
        "type": "Feature",
        "properties": {
            "name": "London",
            "popupContent": "This is where UCL is based"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [-0.13263, 51.522449]
        }
    };
    // and add it to the map and zoom to that location
    // use the mapPoint variable so that we can remove this point layer on
    mapPoint = L.geoJSON(geojsonFeature).addTo(mymap).bindPopup(popUpHTML);
    mymap.setView([51.522449, -0.13263], 12)
    // the on click functionality of the POINT should pop up partially populated condition form so that 
    //the user can select the condition they require
    let popUpHTML = getPopupHTML;
    console.log(popUpHTML);
}


