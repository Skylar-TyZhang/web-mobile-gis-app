'user strict'
// use AJAX to construct url
let baseComputerAddress = document.location.origin;// cross origin 


function saveNewAsset() {
    console.log("Save the infomation in form")
    let assetName = document.getElementById('asset_name').value;
    console.log("asset name:"+ assetName);
    let installationDate = document.getElementById("installation_date").value;
    console.log("installationDate: "+ installationDate);
    let postString = "asset name=" + assetName + "&installationDate=" + installationDate;

    // the '&' is the key that body parser split body 
    // get geometry values
    let latitude = document.getElementById('latitude').value;
    console.log('latitude:'+latitude);
    let longitude = document.getElementById('longitude').value;
    console.log('longitude:'+longitude)
    // poststring is the string that holds values/data to be sent to the server

    postString = postString + "&latitude=" + latitude + "&longitude=" + longitude;
    processData(postString);
};


function deleteSingleAsset() {
    let deleteID = document.getElementById("deleteAsset").value;
    console.log('delete id: '+deleteID);
    let deleteString = "id=" + deleteID;
    let serviceUrl = document.location.origin + "/api/testCRUD";
    $.ajax({
        url: serviceUrl,
        crossDomain: true,
        type: "POST",
        success: function (data) { console.log(data); dataDeleted(data); },
        data: deleteString
    });
}
function dataDeleted(data) {
    console.log('The data will be deleted')
    document.getElementById("dataDeleteResult").innerHTML = JSON.stringify(data);
}

function processData(postString) {
    //alert(postString);

    let serviceUrl = document.location.origin + "/api/testCRUD";
    $.ajax({
        url: serviceUrl,
        crossDomain: true,
        type: "POST",
        data: postString,
        success: function (data) { console.log(data); dataUploaded(data); }

    });
}


// process the response from the data server

function dataUploaded(data) {
    // change the DIV to show the response
    console.log('data:'+JSON.stringify(data))
    document.getElementById('dataUploadResult').innerHTML = JSON.stringify(data);
}
// process condition information