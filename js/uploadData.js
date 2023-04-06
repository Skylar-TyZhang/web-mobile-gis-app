'user strict'
//The functions called in the click methods of the buttons on the forms
//For assignment 4, these functions will send an AJAX request to the /testCRUD end point 
//and then pop up an alert message with the response, as well as logging the 
function saveNewAsset(){
    console.log('Get information of new asset');
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
function checkCondition(id){
    console.log('Get information in condition report')
    
    let assetID = document.getElementById(`conditionForm_${id}`).innerHTML;
    console.log(assetID)   // use console to check the div id 
    let assetName = document.getElementById('asset_name').innerHTML;
    let assetInstallationDate = document.getElementById('installation_date').innerHTML;
    let user_id = document.getElementById('user_id').innerHTML;

    let postString = //'assetID='+assetID+
    "&assetName="+assetName+
    "&assetInstallationDate="+assetInstallationDate+
    '&user_id='+user_id;
    // get information from a radio    
    if (document.getElementById(`condition1_${id}`).checked) {
        postString = postString + "&condition=As new or in good serviceable condition";
    };

    if (document.getElementById(`condition2_${id}`).checked) {
        postString = postString + "&condition=Deteriorating, evidence of high usage, age, additional maintenance costs and inefficiency ";
    };
    if (document.getElementById(`condition3_${id}`).checked) {
        postString = postString + "&condition=Requires replacement within 5 years ";
    };

    if (document.getElementById(`condition4_${id}`).checked) {
        postString = postString + "&condition=In poor condition, overdue for replacement ";
    };

    if (document.getElementById(`condition5_${id}`).checked) {
        postString = postString + "&condition=Unable to determine condition (e.g. as item is hidden)";
    };

    if (document.getElementById(`condition6_${id}`).checked) {
        postString = postString + "&condition=Item does not exist";
    };
    
    let previousCondition = document.getElementById(`previousCondition_${id}`).innerHTML;
    postString=postString+'&previousCondition='+previousCondition;
    console.log('condition:'+postString)
    processData(postString);   

}
function processData(postString) {
    //alert(postString);

    let serviceUrl = document.location.origin + "/api/testCRUD";
    $.ajax({
        url: serviceUrl,
        crossDomain: true,
        type: "POST",
        data: postString,
        success: function (data) { console.log('data:'+JSON.stringify(data)); alert('data:'+JSON.stringify(data))}

    });
}