"use strict";
let ethernetCables;
function getEthernetCables() {
    let layerURL =
        document.location.origin + "/app/data/ethernet.geojson";
    $.ajax({
        url: layerURL, dataType: 'json', success: function (result) {
            console.log(result); // check that the data is correct

            // add the JSON layer onto the map - it will appear using the default icons
            // switch to adapt new style
            let style1 = {
                'color': '#ea3008',
                'weight': 10,
                'opacity': 0.65
            };
            let style2 = {
                'color': '#08EA3E',
                'weight': 10,
                'opacity': 0.65
            };
            let style3 = {
                'color': '#0811EA',
                'weight': 10,
                'opacity': 0.65
            };
            // load the json layer
            ethernetCables = L.geoJson(result).addTo(mymap);
            ethernetCables.addData(result);
            //iterate over the lines and set style depending on district
            ethernetCables.eachLayer(function (layer) {
                console.log(layer);
                switch (layer.feature.properties.criticality) {
                    case 2:
                        layer.setStyle(style1);
                        break;
                    case 3:
                        layer.setStyle(style2);
                        break;
                    default:
                        layer.setStyle(style2);


                }
            });

            // change the map zoom so that all the data is shown
            mymap.fitBounds(ethernetCables.getBounds());

        } // end of the inner function
    }); // end of the ajax request
} // end of the getData function

function removeEthernetCablesData() {
    try {
        alert('the EthernetCables data will be removed');
        mymap.removeLayer(ethernetCables);
    } catch (err) {
        alert('Layer does not exist:' + err);
    }
}
