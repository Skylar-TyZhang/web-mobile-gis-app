"use strict";
// simple funciton to track and show user's location

// create an array to store location track
let trackLocationLayer = [];
//store the ID of location tracker so that it can be used to switch the tracking off
let geoLocationID;

function trackLocation() {
    if (navigator.geolocation) {
        // test if there is an active tracking and clear it if so
        try {
            (navigator.geolocation.clearWatch(geoLocationID))
        }
        catch (e) {
            console.log(e);
        }
        // clear existing data from the map
        removeTracks();
        // coordinates: showPosition
        // if error: errorPosition
        // set parameters: how often to renew, timeout to set
        const options = {
            enableHighAccuracy: true,
            maximumAge: 30000,
            timeout: 27000
        };
        geoLocationID = navigator.geolocation.watchPosition(showPosition, errorPosition, options);
    }

    else {
        document.getElementById('showLocation').innerHTML = "Geolocation is not supported by this browser.";
    }
}

function errorPosition(error) {
    alert(error);
}

function showPosition(position) {
    // add the new point into the array
    // the 'push' command
    trackLocationLayer.push(L.marker([position.coords.latitude, position.coords.longitude]).addTo(mymap));
    
}


function removePositionPoints() {
    //discable the location tracking so that a new point wont be added
    // use the geoLocationID to do this
    navigator.geolocation.clearWatch(geoLocationID);
    removeTracks();
}

function removeTracks() {
    // loop through the array and remove any points
    //start with the last point
    //since if the point 1 was removed then the point 2 becomes point1 and the loop won't work
    for (let i = trackLocationLayer.length - 1; i > -1; i--) {
        console.log('removing point' + i + ',which has coordinates' + trackLocationLayer[i].getLatLng());
        mymap.removeLayer(trackLocationLayer[i]);

        // if the point needs removing from the array as well
        trackLocationLayer.pop();
    }
}

// Proximity alert
function closestFormPoint(userlat,userlng) {
    // take the leaflet formdata layer
    // go through each point one by one
    // and measure the distance to user's location
    // for the closest point show the pop up of that point
    let minDistance = 25/1000;
    let closestFormPoint = 0;
    
    
    mapPoint.eachLayer(function(layer) {
    let distance = calculateDistance(
        userlat, userlng,
        layer.getLatLng().lat, layer.getLatLng().lng, 'K');
    if (distance < minDistance){
    minDistance = distance;
    closestFormPoint = layer.feature.properties.id;
    }
    });
    // for this to be a proximity alert, the minDistance must be
    // closer than a given distance
    // show the popup for the closest point
mapPoint.eachLayer(function(layer) {
    if (layer.feature.properties.id == closestFormPoint){
    layer.openPopup();
    }
    });
}    