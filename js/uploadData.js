'user strict'
async function saveNewAsset() {
    
    //close popup 
    mymap.eachLayer((layer) => {
        layer.closePopup();
        console.log('Popups closed.')
    });
    // validate input data
    if (document.getElementById('asset_name').value == '') {
        alert('Please enter an asset name.');
        return false;
    }
    if (document.getElementById("installation_date").value == '') {
        alert('Please enter an installation date for your asset.');
        return false;
    }
    // get input variables
    let assetName = document.getElementById('asset_name').value;
    let installationDate = document.getElementById("installation_date").value;
    let postString = "asset_name=" + assetName + "&installation_date=" + installationDate;
    let user_id = document.getElementById('user_id').innerHTML;
    // the '&' is the key that body parser split body 
    // get geometry values
    let latitude = document.getElementById('latitude').innerHTML;
    let longitude = document.getElementById('longitude').innerHTML;
    // poststring is the string that holds values/data to be sent to the server
    postString = postString + "&latitude=" + latitude + "&longitude=" + longitude;
    // post action
    let res = await postData("/api/insertAssetPoint", postString);
    //console.log(res);    
    if (res.code == '23505') {
        console.log(res.constraint)
        alert('Sorry, the asset name you provided has been taken.\nPlease provide another name.');
        return false;
    }
    mymap.closePopup()
    mymap.removeLayer(assetPoint);
    // reload layer
    setUpAssetClick();

}


async function checkCondition(id) {
    //close pop ups
    
    let conditions = await getconditionDetails();
    let asset_name = document.getElementById('asset_name').innerHTML;
    let assetInstallationDate = document.getElementById('installation_date').innerHTML;

    let user_id = document.getElementById('user_id').innerHTML;
    let previousCondition = document.getElementById(`previousCondition_${id}`).innerHTML;

    let postString = //'assetID='+assetID+
        "&asset_name=" + asset_name +
        "&assetInstallationDate=" + assetInstallationDate +
        '&user_id=' + user_id;
    // console.log(postString)
    // get information from a radio  
    for (let i = 0; i < conditions.length; i++) {
        if (document.getElementById(`condition_${i + 1}`).checked) {

            let condition_description = conditions[i]["condition_description"]

            postString += "&condition_description=" + condition_description;

            // tell user if their choice matches existing condition 
            if (condition_description != previousCondition) {
                alert('Thank you for letting us know that the condition has changed, your response will be saved.')
            }

        }
    }

    postString = postString + '&previousCondition=' + previousCondition;
    
    // post action
    let res = await postData('/api/insertConditionInformation', postString)
    // get the number of reports that user has submitted
    let res_numReport = await getData(`/api/geojson/userConditionReports/${user_id}`);
    //console.log('Get number of reports')
    //console.log(res_numReport[0].array_to_json[0]['num_reports']);
    let numReport = res_numReport[0].array_to_json[0]['num_reports'];
    console.log(numReport);
    alert(`Thank you for helping us assess assets! You have provided ${numReport} reports.`)

    // close popups
    mymap.eachLayer((layer) => {
        layer.closePopup();
    });
    // setup click event so the color of asset point will change
    mymap.removeLayer(mapPoint);
    console.log('mapPoint removed to load new condition ');
    setUpPointClick();

}
function processData(postString) {
    console.log('Process postString');
    let serviceUrl = document.location.origin + "/api/insertAssetPoint";
    $.ajax({
        url: serviceUrl,
        crossDomain: true,
        type: "POST",
        data: postString,
        success: function (data) { console.log('data:' + JSON.stringify(data)); alert('data:' + JSON.stringify(data)) }

    });
}
