// contain the code to add and remove the earthquakes data
// enforce the use of variable names
"use strict";
let BusStopsLayer;
function getBusStopsData() {
    let layerURL =
        document.location.origin+"/app/data/busstops.geojson";
    $.ajax({
        url: layerURL, dataType: 'json', success: function (result) {
            console.log(result); 

            // add the JSON layer onto the map

            BusStopsLayer = L.geoJson(result).addTo(mymap);
                 
            
            // change the map zoom so that all the data is shown
            mymap.fitBounds(BusStopsLayer.getBounds());
           
        } // end of the inner function
    }); // end of the ajax request
} // end of the getEarthquakeData function

function removeBusStopsData() {
    try {
        alert('the BusStops data will be removed');
        mymap.removeLayer(BusStopsLayer);
    } catch (err) {
        alert('Layer does not exist:' + err);
    }
}