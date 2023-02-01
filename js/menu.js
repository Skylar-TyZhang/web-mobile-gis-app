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

function popAlert_14(){
    
    
    let re = /([^(]+)@|at ([^(]+) \(/g;
    let aRegexResult = re.exec(new Error().stack);
    let sCallerName = aRegexResult[1] || aRegexResult[2];
    alert("menu number is 12 and menu is called by: "+ sCallerName);
}