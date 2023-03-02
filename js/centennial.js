'user strict'
// use AJAX to construct url
let baseComputerAddress = document.location.origin;
// use array to track things
// create an empty array 
// this needs to be a global variable so that it can be accessed by 
// all the functions below
let buildingsLayer = []
function loadBuildings() {
    // first check if the thing is loaded already
    /*
    for (i = 0; i < buildingsLayer.length; i++) {
        if (buildingsLayer[i].thingName == building) {
            console.log("equal");
            alert("Thing already loaded");
            return;
        }
    }
    */
    let dataAddress ="/api/geojson/ucfscde/buildings/building_id/location";
    let layerURL = baseComputerAddress + dataAddress;;// construct url as basecomputer address +data address
    $.ajax({
        url: layerURL, 
        crossDomain: true, 
        success: function (result) {
            console.log(result); // check that the data is correct
            buildingsLayer=L.geoJson(result).addTo(mymap)
            mymap.fitBounds(buildingsLayer.getBounds())
            // now add the thing into the array so that we can reference it later on
            // push adds an item to the top of the array
            buildingsLayer.push(result);
        } // end of the inner function
    }); // end of the ajax request
}
function listAllBuildings() {
    console.log("*********************************");
    console.log("********Current Things *********");
    for (i = 0; i < buildingsLayer.length; i++) {
        console.log(buildingsLayer[i].thingName);
    }
    console.log("*********************************");
}
function removeBuilding(building) {
    for (i = 0; i < buildingsLayer.length; i++) {
        if (buildingsLayer[i].thingname == building) {
            console.log("equal");
            buildingsLayer.splice(i, 1);

            // don't continue the loop as we now have 1 less element in the array which means 
            // that when we try to get the last element it won't be there any more
            break;
        }
    }
}