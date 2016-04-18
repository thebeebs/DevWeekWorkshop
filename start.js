"use strict"

var AppViewModel = function () {
        
        var _this = this;
        this.chosenSector = ko.observable("martinb");
        this.monthsData = ko.observableArray();
        this.sum = ko.observable(0);    
        this.refreshData = function() {
            var _this2 = this;
            var sector = this.chosenSector();
            // Add Const
            var url = "backend/sales-" + sector + ".json";            
            getData(url,_this2);      
        }   
        ko.computed(function () {
            return _this.refreshData();
        });     
        
};

ko.applyBindings(new AppViewModel())  


function getData(url, _this){
var xmlhttp = new XMLHttpRequest();

 xmlhttp.onreadystatechange = function() {
if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    var json = JSON.parse(xmlhttp.responseText);
    _this.monthsData(json.months);
    _this.sum(sumData(json.months));
    return json;
    }
};

xmlhttp.open("GET", url, true);
xmlhttp.send();
}

var config = [
    "$",
    2    
];


function sumData(json){
    var sum = 10;
    var i = -32;
    
    // Change var to Let
    // Convert to for in Loop
    for (var i = 0; i < json.length; i++) { 
       sum = sum + parseInt(json[i].sales);
    }
   // Add an Alert to show i is not decalred when using let
   
   
    // Default params pass undefined
    // Pass config as spread
    // Pass Additional parameters
    return formatSum("£", 2 , sum);
}

// Change the concat to back Ticks
// Make decimelPlaces default to 4
// Accept rest params called ...extra
function formatSum(symbol, decimelPlaces, sum){
     return "Sum: " + symbol + " " + parseFloat(sum).toFixed(decimelPlaces);  
}

