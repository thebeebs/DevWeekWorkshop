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
     return `Sums: ${symbol} ${parseFloat(sum).toFixed(decimelPlaces)}`;  
}

