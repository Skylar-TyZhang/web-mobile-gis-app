'user strict'
// use AJAX to construct url
let baseComputerAddress = document.location.origin;
function saveConditionInformation(id) {
    // get information from the form
    /*The ID of the asset (from the hidden field)
      The condition that the user selected (from the radio button)
      The previous condition (from the hidden field)
      */
    let assetID = document.getElementById('assetID').value;
    let postString = 'assetID='+assetID;
    // get information from a radio
    if (document.getElementById("condition1").checked) {
        postString = postString + "&condition=As new or in good serviceable condition";
    };

    if (document.getElementById("condition2").checked) {
        postString = postString + "&condition=Deteriorating, evidence of high usage, age, additional maintenance costs and inefficiency ";
    };
    if (document.getElementById("condition3").checked) {
        postString = postString + "&condition=Requires replacement within 5 years ";
    };

    if (document.getElementById("condition4").checked) {
        postString = postString + "&condition=In poor condition, overdue for replacement ";
    };

    if (document.getElementById("condition5").checked) {
        postString = postString + "&condition=Unable to determine condition (e.g. as item is hidden)";
    };

    if (document.getElementById("condition6").checked) {
        postString = postString + "&condition=Item does not exist";
    };
    console.log('condition:'+postString)
    let previousCondition = document.getElementById(" previousConditionValue").value;
    postString=postString+'&previousCondition='+previousCondition;
    processCondition(postString);

}
function processCondition(postString) {
    //alert(postString);

    let serviceUrl = document.location.origin + "/api/testCRUD";
    $.ajax({
        url: serviceUrl,
        crossDomain: true,
        type: "POST",
        data: postString,
        success: function (data) { console.log(data); conditionUpload(data); }

    });
}

function conditionUpload(data) {
    // change the DIV to show the response
    console.log('data:'+JSON.stringify(data))
    document.getElementById("conditionResult").innerHTML = JSON.stringify(data);
}