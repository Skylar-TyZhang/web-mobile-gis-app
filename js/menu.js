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
    {
        let re = /([^(]+)@|at ([^(]+) \(/g;
        let aRegexResult = re.exec(new Error().stack);
        let sCallerName = aRegexResult[1] || aRegexResult[2];
        alert("This menu is called by: " + sCallerName);
    }
    console.log(sCallerName)
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
function get5ClosestAssets() {
    {
        let re = /([^(]+)@|at ([^(]+) \(/g;
        let aRegexResult = re.exec(new Error().stack);
        let sCallerName = aRegexResult[1] || aRegexResult[2];
        alert("This menu is called by: " + sCallerName);
    }
    console.log(sCallerName)
};
// remove 5 closest assets
function remove5ClosestAssets() {
    {
        let re = /([^(]+)@|at ([^(]+) \(/g;
        let aRegexResult = re.exec(new Error().stack);
        let sCallerName = aRegexResult[1] || aRegexResult[2];
        alert("This menu is called by: " + sCallerName);
    }
    console.log(sCallerName)
};
// Add Layer -last 5 reports,color coded 
function addLast5Reports() {
    {
        let re = /([^(]+)@|at ([^(]+) \(/g;
        let aRegexResult = re.exec(new Error().stack);
        let sCallerName = aRegexResult[1] || aRegexResult[2];
        alert("This menu is called by: " + sCallerName);
    }
    console.log(sCallerName)
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
function addNotRated() {
    {
        let re = /([^(]+)@|at ([^(]+) \(/g;
        let aRegexResult = re.exec(new Error().stack);
        let sCallerName = aRegexResult[1] || aRegexResult[2];
        alert("This menu is called by: " + sCallerName);
    }
    console.log(sCallerName)
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