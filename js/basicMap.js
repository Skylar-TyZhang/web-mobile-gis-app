"use strict";
// use AJAX to construct url
let baseComputerAddress = document.location.origin;
// add promise object
// the following code is adapted from:https://www.w3schools.com/Js/js_promise.asp
function getData(dataAPI) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: baseComputerAddress + dataAPI,
            crossDomain: true,
            type: 'GET',
            success: function (result) {
                resolve(result);
            },
            error: function (err) {
                reject(err);
            }
        })
    })
}
function postData(dataAPI) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: baseComputerAddress + dataAPI,
            crossDomain: true,
            type: 'POST',
            success: function (result) {
                resolve(result);
            },
            error: function (err) {
                reject(err);
            }
        })
    })
}
// get userId
async function getUserId() {
    let dataAddress = '/api/userId';
    let result = await getData(dataAddress);
    const user_id = result[0].user_id // userid will be a const thus the value will not be reassigned
    //console.log('Got user_id')
    return user_id
}

// get conditionDetails
async function getconditionDetails() {
    let dataAddress = '/api/geojson/conditionDetails';
    let result = await getData(dataAddress);    
    return result
}


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

// modify the leaflet map behaviours
let width; // NB – keep this as a global variable
let mapPoint; // store the geoJSON feature so that we can remove it if the screen is resized
function setMapClickEvent() {
    // get the window width
    width = $(window).width();

    // we use the bootstrap Medium and Large options for the asset location capture
    // and the small and XS options for the condition option
    // see here: https://www.w3schools.com/bootstrap/bootstrap_grid_system.asp

    if (width < 992) {
        console.log('Narrow screen mode')
        //the condition capture anything smaller than 992px is defined as 'medium' by bootstrap
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
async function setUpPointClick() {
    let user_id=await getUserId();
    // Load condition status got from the database
    let conditions = await getconditionDetails();
    
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
    let popUpHTML = getPopupConditionHTML(user_id,conditions);console.log('get popup condition form')
    mapPoint = L.geoJSON(geojsonFeature).addTo(mymap).bindPopup(popUpHTML);
    mymap.setView([51.522449, -0.13263], 12)
    // the on click functionality of the POINT should pop up partially populated condition form so that 
    //the user can select the condition they require

}
// The following function is created so that a condition form will popup on the point
// on the narrow screen 
function getPopupConditionHTML(user_id, conditions) {
    // (in the final assignment, all the required values for the asset pop-up will be 
    //derived from feature.properties.xxx – see the Earthquakes code for how this is done)
    let id = "1"; // this will be the asset ID    
    let previousCondition = 3;
    let assetname = "Asset Name for assignment4";
    let assetInstallationDate = 'Installation date for assignment4';
    
    // use asset id to name the div
    let htmlString = "<div id=conditionForm_" + id + ">" +
        "<h1 id=asset_name>" + assetname +
        "</h1><br>" +
        //"<div id='user_id'>" + user_id + "</div><br>" +
        "<div id='installation_date'>" + assetInstallationDate +
        "</div><br>" 
    htmlString+="<h3>Condition values: </h3>";
    
    // get condition details in form 
    for (let i = 0; i < conditions.length; i++) {
        htmlString += `${conditions[i]['condition_description']
        }<input type="radio" name="condition" id="condition_${conditions[i]['id']}"/><br/>`;
        
    }
    // add a button to process the data
    htmlString = htmlString + "<button onclick='checkCondition(" + id + ");return false'>Submit Condition</button>";

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
    console.log('html string for condition form:'  +htmlString);
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
