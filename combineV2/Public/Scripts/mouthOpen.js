//@input Component.MeshVisual[] meshVisualPetals;
//@input Asset.Material petalsMaterials;
//@input Asset.Material rootsMaterials;
//@input SceneObject[] avkans;

var timeStampsOpen = []; 
var timeOpen = 0;
var oldTime = 0;
var isTalking = false;
var currentItemIndex = 0;
var countAvkan = 0;
var countPetals = 0;
var updateAvkan = false;
var avkanState = null;
var startWait = 3; //seconds
var longWait = 8; //seconds
var mediumWait = 5; //seconds
var shortWait = 0.5; //seconds
var hasStarted = false;

var speed = script.petalsMaterials.mainPass.matTime;
var rootSpeed = script.rootsMaterials.mainPass.rootTime; 

//face parts
var rightEyeFinish = false;
var startingBackground = false;
  
//turnning off//
//inisitally false until called 
for (var i=0; i< script.avkans.length; i++) {
    script.avkans[i].enabled = false;
}
//general app delay
var delayedStart = script.createEvent("DelayedCallbackEvent");
delayedStart.bind(function(){
    hasStarted = true;
})
delayedStart.reset(startWait)

//finish face part
var delayedFinishFacePart = script.createEvent("DelayedCallbackEvent");
delayedFinishFacePart.bind(function(){
     if(rightEyeFinish) {
        startingBackground = true
    }
})
//conditioning the startingBackgrround and calling it after 40
delayedFinishFacePart.reset(40)

  
//general MOUTH OPEN//
global.onMouthOpened = function() {
    timeOpen = getTime();
    timeStampsOpen.push(timeOpen);  
    
    timeStampsLongArray =  timeStampsOpen.filter(function (time) { return time > (timeOpen-15)});
    print("calculating talking" + timeStampsLongArray)

    if (timeStampsLongArray.length >= 2 ) {
        isTalking = true;
    }  
}

var mouthOpenedEvent = script.createEvent("MouthOpenedEvent");
mouthOpenedEvent.bind(onMouthOpened);

function isStopSpeaking() {
    timeStampsShortArray =  timeStampsOpen.filter(function (time) { return time > (getTime()-10)});
    print("calculating not talking" + timeStampsShortArray)   
    if (timeStampsShortArray.length <= 1) {
        isTalking = false;
        timeStampsOpen = []
    }  
 }

//AVKAN//
//delayed AVKAN//
var delayedAvkan = script.createEvent("DelayedCallbackEvent");
delayedAvkan.bind(function(){
    showAvkan()
})

function updateAvkanState() {
    if(updateAvkan===false) {
       updateAvkan = true;
        avkanState = isTalking;
       delayedAvkan.reset(mediumWait)
    }            
}

function showAvkan() {
    if(countAvkan < script.avkans.length) {
        script.avkans[countAvkan].enabled = !avkanState;
        delayedAvkan.reset(shortWait)
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
         if (!hasStarted) {
        script.petalsMaterials.mainPass.matTime=0;
    }
        if (startingBackground==false) {
            script.rootsMaterials.mainPass.rootTime=0;
        } 
        oldTime = newTime
    }
    
     if (isTalking && (speed > 0)) {
        script.petalsMaterials.mainPass.matTime -= 0.0007
        updateAvkanState();
        if(rootSpeed > 0){
        script.rootsMaterials.mainPass.rootTime -= 0.00008;
        }  
    } else if (hasStarted && !isTalking && (speed < 0.6)) {
        script.petalsMaterials.mainPass.matTime += 0.0004;
            updateAvkanState();
            rightEyeFinish =true;
        if (startingBackground && rootSpeed < 0.4){
            script.rootsMaterials.mainPass.rootTime += 0.00005;
        }
    }
}

var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(onUpdate);


