'user strict'
// use AJAX to construct url
let baseComputerAddress = document.location.origin;
// use array to track things
// create an empty array to store asset layers
let centennialAssets = [];
let buildingsLayer = [];
let ethernetcablesLayer = [];
let roomsLayer = [];
let sensorsLayer = [];
let universityLayer = [];

function loadBuildings() {
    // first check if the thing is loaded already

    for (i = 0; i < centennialAssets.length; i++) {
        if (centennialAssets[i] == 'building') {
            console.log("equal");
            alert("Buildings are already loaded");
            return;
        }
    }

    let dataAddress = "/api/geojson/ucfscde/buildings/building_id/location";
    let layerURL = baseComputerAddress + dataAddress;// construct url as basecomputer address +data address
    $.ajax({
        url: layerURL,
        crossDomain: true,
        success: function (result) {
            console.log(result); // check that the data is correct
            buildingsLayer = L.geoJson(result).addTo(mymap)
            mymap.fitBounds(buildingsLayer.getBounds())
            // now add the thing into the array so that we can reference it later on
            // push adds an item to the top of the array
            centennialAssets.push('building');
        } // end of the inner function
    }); // end of the ajax request
}
function listAllAssets() {
    console.log("*********************************");
    console.log("********Current Things *********");
    for (i = 0; i < centennialAssets.length; i++) {
        console.log(centennialAssets[i]);// get names of assets that are already loaded
    }
    console.log("*********************************");
}
function removeBuildings() {
    for (i = 0; i < centennialAssets.length; i++) {
        if (centennialAssets[i] == 'building') {
            console.log("equal asset type");
            centennialAssets.splice(i, 1);

            // don't continue the loop as we now have 1 less element in the array which means 
            // that when we try to get the last element it won't be there any more
            break;
        }
    }
    try {
        alert('the building data will be removed');
        mymap.removeLayer(buildingsLayer);
    } catch (err) {
        alert('Layer does not exist:' + err);
    }
}
// function for ethernet cables
function loadEthernetCables() {
    // first check if the thing is loaded already

    for (i = 0; i < centennialAssets.length; i++) {
        if (centennialAssets[i] == 'ethernet cables') {
            console.log("equal");
            alert("ethernet cables are already loaded");
            return;
        }
    }

    let dataAddress = "/api/geojson/ucfscde/ethernet_cables/ethernet_id/location";
    let layerURL = baseComputerAddress + dataAddress;;// construct url as basecomputer address +data address
    $.ajax({
        url: layerURL,
        crossDomain: true,
        success: function (result) {
            console.log(result); // check that the data is correct
            ethernetcablesLayer = L.geoJson(result).addTo(mymap)
            mymap.fitBounds(ethernetcablesLayer.getBounds())
            // now add the thing into the array so that we can reference it later on
            // push adds an item to the top of the array
            centennialAssets.push('ethernet cables');
        } // end of the inner function
    }); // end of the ajax request
}
function removeEthernetCables() {
    for (i = 0; i < centennialAssets.length; i++) {
        if (centennialAssets[i] == 'ethernet cables') {
            console.log("equal asset type");
            centennialAssets.splice(i, 1);

            // don't continue the loop as we now have 1 less element in the array which means 
            // that when we try to get the last element it won't be there any more
            break;
        }
    }
    try {
        alert('the ethernet cables data will be removed');
        mymap.removeLayer(ethernetcablesLayer);
    } catch (err) {
        alert('Layer does not exist:' + err);
    }
}


function loadRooms(){
    // first check if the thing is loaded already

    for (i = 0; i < centennialAssets.length; i++) {
        if (centennialAssets[i] == 'rooms') {
            console.log("equal");
            alert("rooms are already loaded");
            return;
        }
    }

    let dataAddress = "/api/geojson/ucfscde/rooms/room_id/location";
    let layerURL = baseComputerAddress + dataAddress;;// construct url as basecomputer address +data address
    $.ajax({
        url: layerURL,
        crossDomain: true,
        success: function (result) {
            console.log(result); // check that the data is correct
            roomsLayer = L.geoJson(result).addTo(mymap)
            mymap.fitBounds(roomsLayer.getBounds())
            // now add the thing into the array so that we can reference it later on
            // push adds an item to the top of the array
            centennialAssets.push('rooms');
        } // end of the inner function
    }); // end of the ajax request
}
function removeRooms() {
    for (i = 0; i < centennialAssets.length; i++) {
        if (centennialAssets[i] == 'rooms') {
            console.log("equal asset type");
            centennialAssets.splice(i, 1);

            // don't continue the loop as we now have 1 less element in the array which means 
            // that when we try to get the last element it won't be there any more
            break;
        }
    }
    try {
        alert('the room data will be removed');
        mymap.removeLayer(roomsLayer);
    } catch (err) {
        alert('Layer does not exist:' + err);
    }
}
//sensors
function loadSensors() {
    // first check if the thing is loaded already

    for (i = 0; i < centennialAssets.length; i++) {
        if (centennialAssets[i] == 'sensors') {
            console.log("equal");
            alert("Sensors are already loaded");
            return;
        }
    }

    let dataAddress = "/api/geojson/ucfscde/temperature_sensors/sensor_id/location";
    let layerURL = baseComputerAddress + dataAddress;;// construct url as basecomputer address +data address
    $.ajax({
        url: layerURL,
        crossDomain: true,
        success: function (result) {
            console.log(result); // check that the data is correct
            sensorsLayer = L.geoJson(result).addTo(mymap)
            mymap.fitBounds(sensorsLayer.getBounds())
            // now add the thing into the array so that we can reference it later on
            // push adds an item to the top of the array
            centennialAssets.push('sensors');
        } // end of the inner function
    }); // end of the ajax request
}
function removeSensors() {
    for (i = 0; i < centennialAssets.length; i++) {
        if (centennialAssets[i] == 'sensors') {
            console.log("equal asset type");
            centennialAssets.splice(i, 1);

            // don't continue the loop as we now have 1 less element in the array which means 
            // that when we try to get the last element it won't be there any more
            break;
        }
    }
    try {
        alert('the sensor data will be removed');
        mymap.removeLayer(sensorsLayer);
    } catch (err) {
        alert('Layer does not exist:' + err);
    }
}
// universities
function loadUniversities() {
    // first check if the thing is loaded already

    for (i = 0; i < centennialAssets.length; i++) {
        if (centennialAssets[i] == 'Universities') {
            console.log("equal");
            alert("Universities are already loaded");
            return;
        }
    }

    let dataAddress = "/api/geojson/ucfscde/university/university_id/location";
    let layerURL = baseComputerAddress + dataAddress;;// construct url as basecomputer address +data address
    $.ajax({
        url: layerURL,
        crossDomain: true,
        success: function (result) {
            console.log(result); // check that the data is correct
            universityLayer = L.geoJson(result).addTo(mymap)
            mymap.fitBounds(universityLayer.getBounds())
            // now add the thing into the array so that we can reference it later on
            // push adds an item to the top of the array
            centennialAssets.push('Universities');
        } // end of the inner function
    }); // end of the ajax request
}
function removeUniversities() {
    for (i = 0; i < centennialAssets.length; i++) {
        if (centennialAssets[i] == 'Universities') {
            console.log("equal asset type");
            centennialAssets.splice(i, 1);

            // don't continue the loop as we now have 1 less element in the array which means 
            // that when we try to get the last element it won't be there any more
            break;
        }
    }
    try {
        alert('the Universities data will be removed');
        mymap.removeLayer(universityLayer);
    } catch (err) {
        alert('Layer does not exist:' + err);
    }
}
