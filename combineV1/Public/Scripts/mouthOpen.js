// @input Component.MeshVisual[] meshVisualPetals;
// @input Asset.Material materials;
//@input SceneObject[] avkans;

var timeStampsOpen = []; 
var timeOpen = 0;
var oldTime = 0;
var isTalking = false;
var currentItemIndex = 0;
var countAvkan = 0;
var updateAvkan = false;
var avkanState = null;
var longWait = 10;
var mediumWait = 5;
var shortWait = 2;
var hasStarted = false;

var speed = script.materials.mainPass.matTime;
  
//general MOUTH OPEN//
global.onMouthOpened = function() {
    timeOpen = getTime();
    timeStampsOpen.push(timeOpen);  
    
    timeStampsLongArray =  timeStampsOpen.filter(function (time) { return time > (timeOpen-10)});
    print("fast" + timeStampsLongArray)
    
    if (timeStampsLongArray.length >= 3 ) {
        isTalking = true;
        print(script.materials.mainPass.matTime);
    }  
}

var mouthOpenedEvent = script.createEvent("MouthOpenedEvent");
mouthOpenedEvent.bind(onMouthOpened);

  
function isStopSpeaking() {
    timeStampsShortArray =  timeStampsOpen.filter(function (time) { return time > (getTime()-5)});
    print("slow" + timeStampsShortArray)   
    if (timeStampsShortArray.length <= 1) {
        isTalking = false;
        timeStampsOpen = []
    }  
 }

//general delay//
var delayedStart = script.createEvent("DelayedCallbackEvent");
delayedStart.bind(function(){
    hasStarted = true;
})
//when the avkan initially starts. 
delayedStart.reset(longWait)

//inisitally false until called 
for (var i=0; i< script.avkans.length; i++) {
    script.avkans[i].enabled = false;
}

//delayed AVKAN//
var delayedAvkan = script.createEvent("DelayedCallbackEvent");
delayedAvkan.bind(function(){
    showAvkan()
})

function updateAvkanState() {
    if(updateAvkan===false) {
       updateAvkan = true;
        avkanState = isTalking;
       delayedAvkan.reset(shortWait)
    }            
}

function showAvkan() {
    print('showing')
    if(countAvkan < script.avkans.length) {
        script.avkans[countAvkan].enabled = !avkanState;
        delayedAvkan.reset(mediumWait)
        countAvkan++;
    } else {
        countAvkan = 0;
        updateAvkan =false;
    }
}

//every frame///
function onUpdate (time) {
  newTime = getTime()
  if (newTime - oldTime > 1) {
        isStopSpeaking();
        oldTime = newTime
    }
     if (isTalking && speed > 0) {
     script.materials.mainPass.matTime -=0.0003
        updateAvkanState();
      
    } else if (!isTalking && speed < 0.5) {
        script.materials.mainPass.matTime +=0.0003;
        if(hasStarted) {
        updateAvkanState();
        }
    }
}

var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(onUpdate);


