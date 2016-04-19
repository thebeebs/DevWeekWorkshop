class AppViewModel{
    constructor(){          
        this.chosenSector = ko.observable("martinb");
        this.monthsData = ko.observableArray();
        this.sum = ko.observableArray();
        ko.computed(() => this.refreshData())
    }
    refreshData(){
        const loc = "backend/sales-";
        var sector = this.chosenSector();
        var url = `${loc}${sector}.json`;
        getData(url, this);        
    }
}
 
$(() => ko.applyBindings(new AppViewModel()));

function getData(url, _this){
    if (typeof fetch == 'undefined'){
        return getDataOld(url, _this);
    }
     fetch(url)
        .then(response => response.json())
        .then(json => {
            _this.monthsData(json.months);
            _this.sum(sumData(json.months));
        })        
}

var config = [
    "£",
    2    
];

function sumData(json){
    var sum = 10;
        
    for (let item of json )
    {
       sum = sum + parseInt(item.sales);
    }
   
    return formatSum(...config, sum, 1000, 10000);
}

function formatSum(symbol, decimelPlaces = 4, sum, ...extra){
    for (let value of extra){
        sum = sum + value;
    }
    return `Sum: ${symbol} ${parseFloat(sum).toFixed(decimelPlaces)} in MM`;  
}

function getDataOld(url, _this){
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