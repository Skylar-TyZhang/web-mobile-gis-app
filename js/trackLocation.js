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

    closestFormPoint(position.coords.latitude, position.coords.longitude);
    // add the new point into the array
    trackLocationLayer.push(L.marker([position.coords.latitude, position.coords.longitude]).addTo(mymap));
    // map zoom in 
    mymap.setView([position.coords.latitude, position.coords.longitude], 12);

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
function closestFormPoint(userlat, userlng) {
    // take the leaflet formdata layer
    // go through each point one by one
    // and measure the distance to user's location
    // for the closest point show the pop up of that point
    let minDistance = 25 / 1000;
    let closestFormPoint = 0;


    mapPoint.eachLayer(function (layer) {
        let distance = calculateDistance(
            userlat, userlng,
            layer.getLatLng().lat, layer.getLatLng().lng, 'K');
        if (distance < minDistance) {
            minDistance = distance;
            closestFormPoint = layer.feature.properties.id;
        }
    });
    // for this to be a proximity alert, the minDistance must be
    // closer than a given distance
    // show the popup for the closest point
    mapPoint.eachLayer(function (layer) {
        if (layer.feature.properties.id == closestFormPoint) {
            layer.openPopup();
        }
    });
}



// code adapted from https://www.htmlgoodies.com/beyond/javascript/calculate-the-distance-between-two-points-inyour-web-apps.html
function calculateDistance(lat1, lon1, lat2, lon2, unit) {
    let radlat1 = Math.PI * lat1 / 180;
    let radlat2 = Math.PI * lat2 / 180;
    let radlon1 = Math.PI * lon1 / 180;
    let radlon2 = Math.PI * lon2 / 180;
    let theta = lon1 - lon2;
    let radtheta = Math.PI * theta / 180;
    let subAngle = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    subAngle = Math.acos(subAngle);
    subAngle = subAngle * 180 / Math.PI; // convert the degree value returned by acos back to degrees from radians
    let dist = (subAngle / 360) * 2 * Math.PI * 3956; // ((subtended angle in degrees)/360) * 2 * pi * radius )
    // where radius of the earth is 3956 miles
    if (unit == "K") { dist = dist * 1.609344; } // convert miles to km
    if (unit == "N") { dist = dist * 0.8684; } // convert miles to nautical miles
    return dist;
}
