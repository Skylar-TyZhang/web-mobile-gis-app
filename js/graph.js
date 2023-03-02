'user strict'
//hide the graph div and show the map div
function closeAssetData(){
    let mapCollapse = document.getElementById('mapWrapper');
    let bsMapCollapse = new bootstrap.Collapse(mapCollapse, {
    toggle: false, show:false
    });
    bsMapCollapse.show();
    let adwCollapse = document.getElementById('assetDataWrapperWrapper');
    let bsAdwCollapse = new bootstrap.Collapse(adwCollapse, {
    toggle: false, show:true
    });
    bsAdwCollapse.hide();
   }
// show graph menu
function loadGraph(){
    let mapCollapse = document.getElementById('mapWrapper');
    let bsMapCollapse = new bootstrap.Collapse(mapCollapse, {
    toggle: false, show:false
    });
    bsMapCollapse.hide();
    let adwCollapse = document.getElementById('assetDataWrapperWrapper');
    let bsAdwCollapse = new bootstrap.Collapse(adwCollapse, {
    toggle: false, show:true
    });
    bsAdwCollapse.show();
   // code to create the graph goes here – see below
   }
   