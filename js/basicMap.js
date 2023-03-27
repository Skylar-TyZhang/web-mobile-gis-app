// enforce the use of variable names
"use strict";

// create a custom popup as a global variable
let popup = L.popup();
//set up on map click option
function onMapClick(e) {
    // get the asset form 
    let formHTML = basicFormHtml();
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

// The following code is for the assignment4 part4
// modify the leaflet map behaviours
let width; // NB – keep this as a global variable
//let popup; // keep this as a global variable
let mapPoint; // store the geoJSON feature so that we can remove it if the screen is resized
function setMapClickEvent() {
    // get the window width
    width = $(window).width();

    // we use the bootstrap Medium and Large options for the asset location capture
    // and the small and XS options for the condition option
    // see here: https://www.w3schools.com/bootstrap/bootstrap_grid_system.asp

    if (width < 992) {
        console.log('Narrow screen mode')
        //the condition capture –
        //anything smaller than 992px is defined as 'medium' by bootstrap
        // remove the map point if it exists
        if (mapPoint) {
            console.log('There is a map point');
            mymap.removeLayer(mapPoint);
            console.log('The map point is removed');
        }
        // cancel the map onclick event using off ..
        mymap.off('click', onMapClick);
        // set up a point with click functionality
        // so that anyone clicking will add asset condition information
        setUpPointClick();
    }
    else {
        console.log('Wide screen mode')
        // the asset creation page
        // remove the map point if it exists
        if (mapPoint) {
            console.log('There is a map point');
            mymap.removeLayer(mapPoint);
            console.log('The map point is removed');
        }
        // the onclik functionality of MAP pops up a blank asset creation form
        mymap.on('click', onMapClick);
    }
};


//Create a point and set up the onlick behaviour for the point
function setUpPointClick() {

    // create a geoJSON feature (in your assignment code this will be replaced
    // by an AJAX call to load the asset points on the map
    let geojsonFeature = {
        "type": "Feature",
        "properties": {
            "name": "Hard coded GeoJSON",
            "popupContent": "This is fake data for now."
        },
        "geometry": {
            "type": "Point",
            "coordinates": [-0.13263, 51.522449]
        }
    };
    // and add it to the map and zoom to that location
    // use the mapPoint variable so that we can remove this point layer on
    let popUpHTML = getPopupConHTML;
    mapPoint = L.geoJSON(geojsonFeature).addTo(mymap).bindPopup(popUpHTML);
    mymap.setView([51.522449, -0.13263], 12)
    // the on click functionality of the POINT should pop up partially populated condition form so that 
    //the user can select the condition they require

    console.log(popUpHTML);
}
// The following function is created so that a condition form will popup on the point
// on the narrow screen 
function getPopupConHTML() {
    // (in the final assignment, all the required values for the asset pop-up will be 
    //derived from feature.properties.xxx – see the Earthquakes code for how this is done)
    let asset_id = "1"; // this will be the asset ID    
    let previousCondition = 3;
    let assetname = "Asset Name for assignment4";
    let assetInstallationDate = 'Installation date for assignment4';
    let user_id = 'user id for assignment 4'
    // use asset id to name the div
    let htmlString = "<div id=conditionForm_" + asset_id + ">" +
        "<h1 id=asset_name>" + assetname +
        "</h1><br>" +
        "<div id='user_id'>" + user_id + "</div><br>" +
        "<div id='installation_date'>" + assetInstallationDate +
        "</div><br>" +
        "<h2>Condition values</h2>" +
        'As new or in good serviceable condition' +
        '<input type="radio" name="condition" id="condition1" /><br />' +
        'Deteriorating, evidence of high usage, age, additional maintenance costs and inefficiency' +
        '<input type="radio" name="condition" id="condition2" /><br />' +
        'Requires replacement within 5 years' +
        '<input type="radio" name="condition" id="condition3" /><br />' +
        'In poor condition, overdue for replacement' +
        ' <input type="radio" name="condition" id="condition4" /><br />' +
        'Unable to determine condition (e.g. as item is hidden)' +
        ' <input type="radio" name="condition" id="condition5" /><br />' +
        'Item does not exist' +
        ' <input type="radio" name="condition" id="condition6" /><br />'

    // add a button to process the data
    htmlString = htmlString + "<button onclick='checkCondition(" + asset_id + ");return false;'>Submit Condition</button>";

    // now include a hidden element with the previous condition value
    htmlString +
      '<div id=previousCondition_' +
      asset_id +
      ' hidden>' +
      previousCondition +
      '</div>';
    // and a hidden element with the ID of the asset so that we can insert the condition with the correct asset later
    htmlString = htmlString + "<div id=asset_" + asset_id + " hidden>" + asset_id + "</div>";
    htmlString = htmlString + "<div id=user_id hidden>" + user_id + "</div>";
    htmlString = htmlString + "</div>"; // end of the condition form div
    console.log(htmlString);
    return htmlString;
}


// add basicForm
function basicFormHtml() {

    let formContent =
        "<label for='asset_name'> Asset Name </label>" +
        "<input type='text' size='25' id='asset_name' /><br />" +

        "<label for='installation_date'> Installation Date </label>" +
        "<input type='text' size='25' id='installation_date' /><br />" +

        //<!-- text input box for latitude-->
        "<label for='latitude'>Latitude </label>" +
        "<input type='text' size='25' id='latitude' /><br />" +
        //<!-- text input box for longitude-->
        "<label for='longitude'>Longitude </label>" +
        "<input type='text' size='25' id='longitude' /><br />"
        //<!-- add a button with id of saveAsset and calls a funciton saveNewAsset when clicked-->
        +
        '<button id="saveAsset" onclick="saveNewAsset()">Save asset</button>';

    return formContent;
}
