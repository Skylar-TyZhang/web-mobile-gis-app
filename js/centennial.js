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
    let layerURL = baseComputerAddress + dataAddress;;// construct url as basecomputer address +data address
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

    let dataAddress = "/api/geojson/ucfscde/buildings/building_id/location";
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
    let layerURL = baseComputerAddress + dataAddress;;// construct url as basecomputer address +data address
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
//sensors
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
    let layerURL = baseComputerAddress + dataAddress;;// construct url as basecomputer address +data address
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