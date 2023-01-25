// contain the code to add and remove the earthquakes data
// enforce the use of variable names
"use strict";
let earthquakeLayer;

function getEarthquakeData() {
    let layerURL =
        "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";
    $.ajax({
        url: layerURL, crossDomain: true, success: function (result) {
            console.log(result); // check that the data is correct

            // add the JSON layer onto the map - it will appear using the default icons

            //earthquakelayer = L.geoJson(result).addTo(mymap);

            // custom the function to use custom icons
            // load the geoJSON layer
            earthquakeLayer = L.geoJson(result,
                {
                    // use point to layer to create the points
                    pointToLayer: function (feature, latlng) {
                        // look at the GeoJSON file - specifically at the properties - to see the 
                        //earthquake magnitude and use a different marker depending on this value
                        // also include a pop-up that shows the place value of the earthquakes
                        if (feature.properties.mag > 1.75) {
                            return L.marker(latlng,
                                { icon: testMarkerGreen }).bindPopup("<b>" + feature.properties.place + "</b>");
                        }
                        else {
                            // magnitude is 1.75 or less
                            return L.marker(latlng,
                                { icon: testMarkerPink }).bindPopup("<b>" + feature.properties.place + "</b>");;
                        }
                    }, // end of point to layer
                }).addTo(mymap);

            // change the map zoom so that all the data is shown
            mymap.fitBounds(earthquakeLayer.getBounds());

        } // end of the inner function
    }); // end of the ajax request
} // end of the getEarthquakeData function

function removeEarthquakeData() {
    try {
        alert('the earthquake data will be removed');
        mymap.removeLayer(earthquakeLayer);
    } catch (err) {
        alert('Layer does not exist:' + err);
    }
}

