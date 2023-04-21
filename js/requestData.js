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
function postData(dataAPI, data) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: baseComputerAddress + dataAPI,
            crossDomain: true,
            type: 'POST',
            data: data,
            success: function (result) {
                resolve(result); console.log(result)
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

