# Installation
Once you have cloned the run 
    *bower install*
at cmd line. 

Run *NPM install*
Run *NPM start* to start the application.

## 1. Add a class with a constructor:

        class AppViewModel{
            constructor(){  
                
                this.chosenSector = ko.observable("martinb");
                this.monthsData = ko.observableArray();
                this.sum = ko.observableArray();
                ko.computed(() => this.refreshData())
            }
            refreshData(){
                const loc = ;
                var sector = this.chosenSector();
                var url = "backend/sales-" + sector + ".json";
                getData(url, this);        
            }
        }
        
        $(() => ko.applyBindings(new AppViewModel()));
     
## 2. Arrow Functions and using 'this'
How 'this' works in JavaScript functions is a common prblem for  in programmers 
coming to JavaScript. Indeed, learning how to use it is something of a rite 
of passage as developers become more accustomed to working in JavaScript.

A whole article could be written on how to use 'this' in JavaScript, 
and many have. Here, we'll focus on some of the basics.

In JavaScript, 'this' is a variable that's set when a function is called. 
This makes it a very powerful and flexible feature, 
but it comes at the cost of always having to know about the context 
that a function is executing in. This can be notoriously confusing, when, 
for example, a function is used as a callback.

        ko.computed(function(){
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var json = JSON.parse(xmlhttp.responseText);
                this.monthsData(json.months);
                this.sum(sumData(json.months));
                return json;
                }
            };
            xmlhttp.open("GET", url, true);
            xmlhttp.send();        
        })
 
 
If we tried to run the example, we would get an error instead of the expected result. 
This is because the 'this' being used in the function created by 
'onreadystatechange' will be set to 'window' instead of our 'AppViewModel' object. 
Here, there is no dynamic binding for 'this' other than Window. 
(note: under strict mode, this will be undefined rather than window).

 We can fix this by making sure the function is bound to the correct 'this' before we return the function to be used later. 
 This way, regardless of how its later used, it will still be able to see the original 'AppViewModeldeck' object.

 To fix this, switching the function expression to use the lambda syntax ( ()=>{} ) rather than the JavaScript function expression. 
 This will automatically capture the 'this' available when the function is created rather than when it is invoked:

        ko.computed(() => {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var json = JSON.parse(xmlhttp.responseText);
                this.monthsData(json.months);
                this.sum(sumData(json.months));
                return json;
                }
            };
            xmlhttp.open("GET", url, true);
            xmlhttp.send();        
        })
        
       
       
## 3. Const
 
 This new keyword alows you to create a constant which could be used in place of a
 variable if you have a value that shouldn't change during the lifecycle of the application.

    const loc = "backend/sales-";
    var url = loc + sector + ".json";

## 4. Template Strings

Traditionally in JavaScript we would join strings and variable together using +. 
Whilst this works it can be messy when you are working with lots of variables.

    var url = "backend/sales-" + sector + ".json";

To make it better ES2015 now has template strings which allow this syntax:

    var url = `backend/sales-${sector}.json`;

Template strings are enclosed by the back-tick (\`) (grave accent) character instead 
of double or single quotes. On many keyboard the grave key
can be found under or near the `ESC` key (or next to the `ctrl` key on Mac keyboard).

You can also use this to span multiple lines. For example this is valid and the new 
line will actually be interpreted.

	var toLog = `You could say stuff
              and make it
              span multiple lines`; // This is valid
    console.log(toLog)

## 5. Let
 
 This new keyword alows you to create a 
 variable which is only avalible in it's current scope.
 
    for (let i = 0; i < json.length; i++) { 
        sum = sum + parseInt(json[i].sales);
    }
    
    alert(i) // i Will be undefined

## 6. For In Loop

    for (let item of json )
    {
        sum = sum + parseInt(item.sales);
    }
    
## 7. Default Parameters

    function formatSum(symbol, decimelPlaces = 5, sum){

    return formatSum("£", undefined , sum);

## 8. Spread

Spread out the values in the config array as parameters for the formatSum function

    var config = [
        "$",
        2    
    ];
    
    return formatSum(...config , sum);
    
## 9. Rest

Take additional parameters in a function as an array.

    return formatSum(...config, sum, 1000, 10000);
    
    function formatSum(symbol, decimelPlaces = 4, sum, ...extra){
        for (let value of extra){
            sum = sum + value;
        }
        return `Sum: ${symbol} ${parseFloat(sum).toFixed(decimelPlaces)} in MM`;  
    }
    
## 10. Promises

    addElement("first")
    .then(x => {return addElement("second")})
    .then(x => { return addElement("third")})
    .then(x => { return addElement("fourth")})
