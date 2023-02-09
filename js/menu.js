// This is to process the menu functionality
'user strict'
let menu1= function(){

    
try {
    alert('This is menu1');
   
} catch (err) {
    alert( err);
}
}
console.log('menu function1')

function popAlert_12(){
    
    
    let re = /([^(]+)@|at ([^(]+) \(/g;
    let aRegexResult = re.exec(new Error().stack);
    let sCallerName = aRegexResult[1] || aRegexResult[2];
    alert("menu number is 12 and menu is called by: "+ sCallerName);
}
function popAlert_13(){
    
    
    let re = /([^(]+)@|at ([^(]+) \(/g;
    let aRegexResult = re.exec(new Error().stack);
    let sCallerName = aRegexResult[1] || aRegexResult[2];
    alert("menu number is 13 and menu is called by: "+ sCallerName);
}
function popAlert_15(){
    
    
    {let re = /([^(]+)@|at ([^(]+) \(/g;
    let aRegexResult = re.exec(new Error().stack);
    let sCallerName = aRegexResult[1] || aRegexResult[2];
    alert("menu number is 15 and menu is called by: "+ sCallerName);}
}
function popAlert_16(){
    {
        let re = /([^(]+)@|at ([^(]+) \(/g;
    let aRegexResult = re.exec(new Error().stack);
    let sCallerName = aRegexResult[1] || aRegexResult[2];
    alert("menu number is 16 and menu is called by: "+ sCallerName);
}
    console.log(sCallerName)
};