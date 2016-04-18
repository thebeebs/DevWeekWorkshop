class AppViewModel{
    constructor(){       
          
        this.chosenSector = ko.observable("martinb");
        this.monthsData = ko.observableArray();
        ko.computed(() => this.refreshData())
    }
    refreshData(){
        var sector = this.chosenSector();
        var url = `backend/sales-${sector}.json`;
        fetch(url)
        .then(response => response.json())
        .then(json => this.monthsData(json.months))        
        }
}
 
$(() => ko.applyBindings(new AppViewModel));
