## Once you have cloned the run "Bower Install" at cmd line. 

## Run "NPM install"

## Run "NPM Start"

#Workshop: 
1.  Add a class with a constructor:

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
        
 2. Explore the => Lambda (fat arrow) Function.