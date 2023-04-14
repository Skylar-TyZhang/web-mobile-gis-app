'user strict'
async function saveNewAsset() {
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
    let res = await postData("/api/insertAssetPoint",postString);
    console.log(res.message);
    mymap.eachLayer((layer) => {
      layer.closePopup();
    });
    
    
    
}


async function checkCondition(id) {
    let conditions = await getconditionDetails();
    console.log('check condition')
    let asset_name = document.getElementById('asset_name').innerHTML;
    let assetInstallationDate = document.getElementById('installation_date').innerHTML;
    
    let user_id = document.getElementById('user_id').innerHTML;
    
    let postString = //'assetID='+assetID+
        "&asset_name=" + asset_name +
        "&assetInstallationDate=" + assetInstallationDate +
        '&user_id=' + user_id;
       // console.log(postString)
    // get information from a radio  
    for  (let i=0;i<conditions.length; i++){        
        if(document.getElementById(`condition_${i+1}`).checked){
            
            let condition_description=conditions[i]["condition_description"]
            
            postString+="&condition_description="+condition_description;
        }
    }
    let previousCondition = document.getElementById(`previousCondition_${id}`).innerHTML;
    postString = postString + '&previousCondition=' + previousCondition;
    //console.log(postString)
    // post action
    let res= await postData('/api/insertConditionInformation', postString)
    // tell user if their choice matches existing condition 
    /*
    if (condition_description!=previousCondition){
        alert('Thank you letting us know that the condition has changed, your response will be saved.')
    }
    */
    //processData(postString);
    
    mymap.eachLayer((layer) => {
      layer.closePopup();
    });

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
