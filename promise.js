'use strict';
addElementOld("First");
addElementOld("Second");
addElementOld("Third");
addElementOld("Fourth");

// addElement("first")
// .then(x => {return addElement("second")})
// .then(x => { return addElement("third")})
// .then(x => { return addElement("fourth")})

// doThisStuff();
//  async function doThisStuff(){
//    await addElement("first");
//    await addElement("second");
//    await addElement("third");
//    await addElement("fourth");  
// }

function addElement(elementText){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            var element=document.createElement('H1');
            element.innerText = `${elementText} ${Date.now()}`;
            document.body.appendChild(element);
            resolve();
        }, Math.random() * 2000);
    });
}

function addElementOld(elementText){
     setTimeout(function(){
        var element=document.createElement('H1');
        element.innerText = `${elementText} ${Date.now()}`;
        document.body.appendChild(element);
    }, Math.random() * 2000);
}

