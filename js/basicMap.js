"use strict";
// create a custom popup as a global variable
let popup = L.popup();
//set up on map click option
async function onMapClick(e) {
    // get the asset form 
    let formHTML = await basicFormHtml(e.latlng);
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at (" +
            '<span id="lat">' + e.latlng.lat + "</span>" +
            ',' +
            '<span id="lon">' + e.latlng.lng + "</span>)" +
            '<br>' +
            formHTML)
        .openOn(mymap);
}

// modify the leaflet map behaviours
let width; // NB – keep this as a global variable
let mapPoint; // store the geoJSON feature so that we can remove it if the screen is resized
function setMapClickEvent() {
    // get the window width
    width = $(window).width();
    console.log(width)
    popup.remove();

    // only the bootstrap Large options for the asset location capture
    // and the small and XS options for the condition option
    // the breakpoint was set as https://getbootstrap.com/docs/5.0/layout/breakpoints/

    if (width < 768) {  
        // >= 768px is medium screen
        /*
        // close all popups
        mymap.eachLayer((layer) => {
            layer.closePopup();
        });
        */
        // remove asset points that should show on wide screen
        if (assetPoint) {
            mymap.removeLayer(assetPoint);
        }
        console.log('Condition app mode')
        removePositionPoints()

        // cancel the map onclick event using off ..
        mymap.off('click', onMapClick);
        // set up a point with click functionality
        // so that anyone clicking will add asset condition information
        setUpPointClick();
        

        // track location
        trackLocation();

    }
    if ( width >= 992) {
        console.log('Asset creation mode')
        // the asset creation page
        // remove the map point if it exists
        if (mapPoint) {
            mymap.removeLayer(mapPoint);
        }

        //stop tracking location of user

        removePositionPoints();
        setUpAssetClick();
        // the onclik functionality of MAP pops up a blank asset creation form
        mymap.on('click', onMapClick);
    }
};


//Create a point and set up the onlick behaviour for the point
async function setUpPointClick() {
    
    let user_id = await getUserId();
    // Load condition status got from the database
    let conditions = await getconditionDetails(); //console.log(conditions)
    // load asset information
    let asset = await getData(`/api/geojson/userAssets/${user_id}`);
    width = $(window).width();

    // check data: since the data will be used in a popup the function onEachFeature was used    
    // https://leafletjs.com/examples/geojson/
    mapPoint = L.geoJSON(asset, {
        async onEachFeature(feature, layer) {
            let assetInfo = feature.properties;
            let popUpHTML = await getPopupConditionHTML(assetInfo, conditions);

            layer.bindPopup(popUpHTML)
            //console.log(popUpHTML);
        },
        pointToLayer: function (feature, latlng) {
            let featureCondition = feature.properties['condition_description'];
            
            let conditionMarker0 = L.AwesomeMarkers.icon({
                icon: 'play',
                markerColor: 'blue',
            });
            let conditionMarker1 = L.AwesomeMarkers.icon({
                icon: 'play',
                markerColor: 'green',
            });
            let conditionMarker2 = L.AwesomeMarkers.icon({
                icon: 'play',
                markerColor: 'pink',
            });
            let conditionMarker3 = L.AwesomeMarkers.icon({
                icon: 'play',
                markerColor: 'purple',
            });
            let conditionMarker4 = L.AwesomeMarkers.icon({
                icon: 'play',
                markerColor: 'orange',
            });
            let conditionMarker5 = L.AwesomeMarkers.icon({
                icon: 'play',
                markerColor: 'gray',
            });


            if (featureCondition == conditions[0]['condition_description']) {
                
                return L.marker(latlng, { icon: conditionMarker0 })
            }
            else if (featureCondition == conditions[1]['condition_description']) {
           
                return L.marker(latlng, { icon: conditionMarker1 })
            }
            else if (featureCondition == conditions[2]['condition_description']) {
                return L.marker(latlng, { icon: conditionMarker2 })
            }
            else if (featureCondition == conditions[3]['condition_description']) {
                return L.marker(latlng, { icon: conditionMarker3 })
            }
            else if (featureCondition == conditions[4]['condition_description']) {
                return L.marker(latlng, { icon: conditionMarker4 })
            }
            else if (featureCondition == conditions[5]['condition_description']) {
                return L.marker(latlng, { icon: conditionMarker5 })
            }
        },

    }).addTo(mymap);
    
    //console.log('condition assessment mode on, assets loaded with condition forms.')
    mymap.fitBounds(mapPoint.getBounds());
    //mymap.setView([51.522449, -0.13263], 12)

    // the on click functionality of the POINT should pop up partially populated condition form so that 
    //the user can select the condition they require


};


// Core functionality2 
// Asset point creation mode
// Show the existing asset points that the user has created
let assetPoint;
async function setUpAssetClick() {
    let user_id = await getUserId();
    let asset = await getData(`/api/geojson/userAssets/${user_id}`);
    assetPoint = L.geoJSON(asset, {
        async onEachFeature(feature, layer) {

            //read-only popup form show the latest condition information if available
            // if no available condition, 'No condition captured.'

            let featureCondition = feature.properties['condition_description'];
            layer.bindPopup(featureCondition)
            if (featureCondition == 'Unknown') {
                layer.bindPopup('No condition captured');
            };

        }
    }).addTo(mymap);
    mymap.fitBounds(assetPoint.getBounds());
    console.log('Asset creation mode on, get asset data from database and add asset points on the map.')
    // mymap.setView([51.522449, -0.13263], 12)

};


// The following function is created so that a condition form will popup on the point
// on the narrow screen 
async function getPopupConditionHTML(assetInfo, conditions) {
    // (in the final assignment, all the required values for the asset pop-up will be 
    //derived from feature.properties.xxx – see the Earthquakes code for how this is done)
    const user_id = await getUserId();
    let id = assetInfo.asset_id; // this will be the asset ID    
    let previousCondition = assetInfo.condition_description;
    let assetname = assetInfo.asset_name;
    let assetInstallationDate = assetInfo.installation_date;
    // use asset id to name the div
    let htmlString = "<div id='conditionForm'>" +
        "<h3 id=asset_name>" + assetname +
        "</h3>" +
        "<div id='installation_date'>" + assetInstallationDate +
        "</div>"
    htmlString += "<h4>Condition values: </h4>";


    // get condition details in form 
    for (let i = 0; i < conditions.length; i++) {
        htmlString += `${conditions[i]['condition_description']
            }<input type="radio" name="condition" id="condition_${conditions[i]['id']}"/><br/>`;

    }

    // add a button to process the data
    htmlString = htmlString + "<button type='submit' onclick='checkCondition(" + id + ");return false'>Submit Condition</button>";

    // now include a hidden element with the previous condition value
    htmlString = htmlString +
        '<div id=previousCondition_' +
        id +
        ' hidden>' +
        previousCondition +
        '</div>';

    // and a hidden element with the ID of the asset so that we can insert the condition with the correct asset later
    htmlString = htmlString + "<div id=asset_" + id + " hidden>" + id + "</div>";

    htmlString = htmlString + "<div id=user_id hidden>" + user_id + "</div>";

    htmlString = htmlString + "</div>"; // end of the condition form div

    return htmlString;
};


// add basicForm
async function basicFormHtml(latlng) {
    const user_id = await getUserId();

    let formContent =
        '<div id="user_id" style="display: none">' +
        user_id +
        '</div>' +
        '<div id=latitude style="display: none">' + latlng.lat + '</div>' +
        '<div id=longitude style="display: none">' + latlng.lng + '</div>' +
        "<label for='asset_name'> Asset Name </label>" +
        "<input type='text' size='25' id='asset_name' /><br />" +

        "<label for='installation_date'> Installation Date </label>" +
        "<input type='date' size='25' id='installation_date' /><br />"

        //<!-- add a button with id of saveAsset and calls a funciton saveNewAsset when clicked-->
        +
        '<button type="submit" id="saveAsset" onclick="saveNewAsset()">Save asset</button>';

    return formContent;
};

