// enforce the use of variable names
"use strict";

// global vairalbe to store the map
// create an event detector to wait for the user's click event and then use the popup to show them where they clicked
let mymap;

function loadLeafletMap() {
    console.log('This is at the start of the first function')
    mymap = L.map('mapid').setView([51.505, -0.09], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy;<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mymap);
    console.log('Map created')
    // now call the code to add the markers
    //addBasicMarkers();
    // add the click event detector to the map
    mymap.on('click', onMapClick);
}// end code to add the leaflet map


// create a custom popup as a global variable
let popup = L.popup();
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent('You click the map at' + e.latlng.toString())
        .openOn(mymap);
}


// The following code is for the assignment4 part4
//Modify the leaflet map behaviours
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
        //the condition capture –
        //anything smaller than 992px is defined as 'medium' by bootstrap
        // remove the map point if it exists
        if (mapPoint) {
            mymap.removeLayer(mapPoint);
        }
        // cancel the map onclick event using off ..
        mymap.off('click', onMapClick)
        // set up a point with click functionality
        // so that anyone clicking will add asset condition information
        setUpPointClick();
    }
    else { // the asset creation page
        // remove the map point if it exists
        if (mapPoint) {
            mymap.removeLayer(mapPoint);
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
            "name": "London",
            "popupContent": "This is where UCL is based"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [-0.13263, 51.522449]
        }
    };
    // and add it to the map and zoom to that location
    // use the mapPoint variable so that we can remove this point layer on
    mapPoint = L.geoJSON(geojsonFeature).addTo(mymap).bindPopup(popUpHTML);
    mymap.setView([51.522449, -0.13263], 12)
    // the on click functionality of the POINT should pop up partially populated condition form so that 
    //the user can select the condition they require
    let popUpHTML = getPopupHTML;
    console.log(popUpHTML);
}
function getPopupHTML() {
    // (in the final assignment, all the required values for the asset pop-up will be 
    //derived from feature.properties.xxx – see the Earthquakes code for how this is done)
    let id = "1272"; // this will be the asset ID
    
    let previousCondition = 3;

    let assetname = "asset";
    let assetInstallationDate = '2001-01-01';
    let htmlString = "<DIV id='popup'" + id + "><h2>" + assetname + "</h2><br>";
    htmlString = htmlString + "<h3>" + assetInstallationDate + "</h3><br>";
    htmlString = htmlString + "<p>Condition values</p> As new or in good serviceable condition"
    htmlString = htmlString + "<input type='radio' name='amorpm' id='" + id + "_1' /><br/>"
    htmlString = htmlString + "Deteriorating, evidence of high usage, age, additional maintenance costs and inefficiency"
    htmlString = htmlString + " <input type='radio' name='amorpm' id='" + id + "_2' /><br/>"
    htmlString = htmlString + "Requires replacement within 5 years"
    htmlString = htmlString + "<input type='radio' name='amorpm' id='" + id + "_3' /><br/>"
    htmlString = htmlString + "In poor condition, overdue for replacement"
    htmlString = htmlString + " <input type='radio' name='amorpm' id='" + id + "_4' /><br/>"
    htmlString = htmlString + "Unable to determine condition (e.g. as item is hidden)"
    htmlString = htmlString + "<input type='radio' name='amorpm' id='" + id + "_5' /><br />"
    htmlString = htmlString + "Item does not exist <input type='radio' name='amorpm' id='" + id + "_6' /><br />";

    // add a button to process the data
    htmlString = htmlString + "<button onclick='checkCondition(" + id + ");return false;'>Submit Condition</button>";

    // now include a hidden element with the previous condition value
    htmlString = htmlString + "<div id=previousCondition_" + id + "hidden>" + previousCondition + "</div>";
    // and a hidden element with the ID of the asset so that we can insert the condition with the correct asset later
    htmlString = htmlString + "<div id=asset_ " + id + " hidden>" + id + "</div>";
    htmlString = htmlString + "</div>";
    return htmlString;
}

// the following funciton is used for process the data
// Requirement:
// 1- ckeck if the condition is the same as the previous one
// create a poststring to send to /testCRUD and return a response to the user
function checkCondition() {
    alert(htmlString);

    let serviceUrl = document.location.origin + "/api/testCRUD";
    $.ajax({
        url: serviceUrl,
        crossDomain: true,
        type: "POST",
        data: htmlString,
        success: function (data) { console.log(data); }

    });
}
//--------------------------------------------
function onMapClick(e) {
    let formHTML = basicFormHtml();
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString() + "<br>" + formHTML)
        .openOn(mymap);
}

// add basicForm
function basicFormHtml() {

    let myvar = "<label for='asset_name'> asset_name </label><input type='text' size='25' id='asset_name' /><br />" +

        "<label for='installation_date'>installation_date </label><input type='text' size='25' id='installation_date' /><br />" +

        //<!-- text input box for latitude-->
        "<label for='latitude'>Latitude </label><input type='text' size='25' id='latitude' /><br />" +
        //<!-- text input box for longitude-->
        "<label for='longitude'>Longitude </label><input type='text' size='25' id='longitude' /><br />" +


        //<!-- add a button with id of saveAsset and calls a funciton saveNewAsset when clicked-->
        "<p>Click here to save the data</p>" +
        "<button id='saveAsset' onclick='saveNewAsset()'>Save asset</button>"

    return myvar;
}
