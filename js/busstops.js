// contain the code to add and remove the earthquakes data
// enforce the use of variable names
"use strict";
let busstopsLayer;
function getBusStopsData() {
    let layerURL =
        document.location.origin+"/app/data/busstops.geojson";
    $.ajax({
        url: layerURL, crossDomain: true, success: function (result) {
            console.log(result); // check that the data is correct

            // add the JSON layer onto the map - it will appear using the default icons

            busstopsLayer = L.geoJson(result).addTo(mymap);
            // custom the function to use custom icons
            // load the geoJSON layer
            




            // change the map zoom so that all the data is shown
            mymap.fitBounds(earthquakelayer.getBounds());
            let testMarkerGreen = L.AwesomeMarkers.icon({
                icon: 'play',
                markerColor: 'green'
            });
            let testMarkerPink = L.AwesomeMarkers.icon({
                icon: 'play',
                markerColor: 'pink'
            });
        } // end of the inner function
    }); // end of the ajax request
} // end of the getEarthquakeData function

