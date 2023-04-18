// This is to process the menu functionality
"use strict";

async function assetInBestCondition() {
    let res = await getData('/api/geojson/assetsInGreatCondition');

    let assets = res[0].array_to_json;
    let assetList = [];
    for (let i = 0; i < assets.length; i++) {
        assetList.push(assets[i].asset_name);
    }

    alert(`Thank you for reqeusting the list of assets in best condition!\nTheir names are listed below:\n${assetList.join('\n')}`)

};
//load reporting rate graph
function dailyReportingRatesGraph() {
    loadGraph();
};
// load help documentation

function help() {
    {
        let re = /([^(]+)@|at ([^(]+) \(/g;
        let aRegexResult = re.exec(new Error().stack);
        let sCallerName = aRegexResult[1] || aRegexResult[2];
        alert("This menu is called by: " + sCallerName);
    }
    console.log(sCallerName)
};
// get user ranking
async function getUserRanking() {
    let user_id = await getUserId();
    let rank = await getData(`/api/geojson/userRanking/${user_id}`)
    console.log(rank[0].array_to_json[0]['rank']);
    let userRank = rank[0].array_to_json[0]['rank'];
    alert(`Your rank based on number of reports created is the ${userRank}th over all the users. Thank you for your contribution!`)

};
// get 5 closest assets
let closest5AssetLayer=[]; //create a layer for 5 cloest assets
async function get5ClosestAssets() {
    // get the current location by return the last element in array
    let loc=trackLocationLayer.slice(-1);
    let latitude=loc[0]._latlng.lat;
    //console.log(latitude);
    let longitude=loc[0]._latlng.lng;
    //console.log(longitude);
    
    let res= await getData(`/api/geojson/userFiveClosestAssets/${latitude}/${longitude}`)
    console.log(res);
     
    //console.log(res[0].features);
    closest5AssetLayer=L.geoJSON(res        
    ).addTo(mymap);
    // zoom to the asset points
    mymap.fitBounds(closest5AssetLayer.getBounds());
    
};
// remove 5 closest assets
function remove5ClosestAssets() {
    try {
        alert('The 5 closest assets will be removed.');
        mymap.removeLayer(closest5AssetLayer);
        
    } catch (err) {
        alert("Sorry, you haven't loaded the 5 closest assets so there is nothing to remove." + err);
    }
};
// Add Layer -last 5 reports,color coded 
let last5ReportsLayer=[];
async function addLast5Reports() {
    let user_id=await getUserId();
    // Load condition status got from the database
    let conditions = await getconditionDetails();
    let res = await getData(`/api/geojson/lastFiveConditionReports/${user_id}`);
    console.log(res);
    last5ReportsLayer=L.geoJSON(res,{
        onEachFeature(feature){
            console.log(feature.properties)
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
    

};
// Remove Layer -last 5 reports,color coded 
function removeLast5Reports() {
    {
        let re = /([^(]+)@|at ([^(]+) \(/g;
        let aRegexResult = re.exec(new Error().stack);
        let sCallerName = aRegexResult[1] || aRegexResult[2];
        alert("This menu is called by: " + sCallerName);
    }
    console.log(sCallerName)
};
// Add Layer - not rated in the last 3 days
async function addNotRated() {
    let user_id=await getUserId();
    let res = await getData(`/api/geojson/conditionReportMissing/${user_id}`);
    console.log(res);
};
// Remove Layer - not rated in the last 3 days
function removeNotRated() {
    {
        let re = /([^(]+)@|at ([^(]+) \(/g;
        let aRegexResult = re.exec(new Error().stack);
        let sCallerName = aRegexResult[1] || aRegexResult[2];
        alert("This menu is called by: " + sCallerName);
    }
    console.log(sCallerName)
};