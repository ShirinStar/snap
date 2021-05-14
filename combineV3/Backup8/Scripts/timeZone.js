
// @input Component.MeshVisual[] flowerObjects
// @input Asset.Material[] flowerMaterial


var currentTextureIndex = 0;
var currentDate = new Date();
//print("Today is: " + global.localizationSystem.getDayOfWeek(currentDate));
//print("Today is: " + global.localizationSystem.getMonth(currentDate));
//this print UTC time zone. 
print("The current time is: " + global.localizationSystem.getTimeFormatted(currentDate));

//this convert timezone.  (PST is === -7:00) // (EST is === -4:00)
function getTimeZone() {
    var offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
    return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
}

print(getTimeZone())

// Function to clear the current materials and add a new one
function setMaterial(material){
    for (var i = 0 ; i < script.flowerObjects.length; i++) {
         script.flowerObjects[i].clearMaterials();
         script.flowerObjects[i].addMaterial(material);
    }
}

setMaterial(script.flowerMaterial[currentTextureIndex]);

function changeMaterial() {
    if (getTimeZone() === '-07:00') {
        currentTextureIndex = 1;
    } if(getTimeZone() === '-04:00') {
        currentTextureIndex = 0;
    }
    setMaterial(script.flowerMaterial[currentTextureIndex]);
}

function onUpdate (time) { 
    changeMaterial();
}


var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(onUpdate);

//function changeMaterial () {
// currentTextureIndex++;
// // We need the current item index to wrap around once it's higher than the number of items we have.
// currentTextureIndex = currentTextureIndex % script.flowerMaterial.length;
// setMaterial(script.flowerMaterial[currentTextureIndex]);
//}
//
//var touchEvent = script.createEvent("TapEvent");
//touchEvent.bind(changeMaterial);


//changing texture by tap
//var count = 0;
//script.testObject.mainMaterial = script.flowerMaterial[0]
//
//function onTap(eventData) {
//
//    print('called')
//    count++;
//    if(count >= script.flowerMaterial.length) {
//        count = 0;
//    }
//    script.testObject.mainMaterial = script.flowerMaterial[count]
//}
//
//var event = script.createEvent('TapEvent');
//event.bind(onTap)

