"use strict";
let EthernetCablesLayer;
function getEthernetCablesData() {
    let layerURL =
        document.location.origin+"/app/data/ethernet.geojson";
    $.ajax({
        url: layerURL, dataType: 'json', success: function (result) {
            console.log(result); // check that the data is correct

            // add the JSON layer onto the map - it will appear using the default icons

            EthernetCablesLayer = L.geoJson(result).addTo(mymap);
            
            // change the map zoom so that all the data is shown
            mymap.fitBounds(EthernetCablesLayer.getBounds());
          
        } // end of the inner function
    }); // end of the ajax request
} // end of the getData function

function removeEthernetCablesData() {
    try {
        alert('the EthernetCables data will be removed');
        mymap.removeLayer(EthernetCablesLayer);
    } catch (err) {
        alert('Layer does not exist:' + err);
    }
}
