//@input Component.MeshVisual[] meshVisualPetals;
//@input Asset.Material rightEyePetalsMaterials;
//@input SceneObject[] avkans;
//@input Asset.Material rightCheekPetalMaterials;
//@input Asset.Material rootsMaterials;

var timeStampsOpen = []; 
var timeOpen = 0;
var oldTime = 0;
var isTalking = false;
var currentItemIndex = 0;
var countAvkan = 0;
var countPetals = 0;
var updateAvkan = false;
var avkanState = null;
var startWait = 10; //seconds
var longWait = 8; //seconds
var mediumWait = 5; //seconds
var shortWait = 0.5; //seconds
var hasStarted = false;

var rightEyeSpeed = script.rightEyePetalsMaterials.mainPass.matTime;
var rightCheakSpeed = script.rightCheekPetalMaterials.mainPass.matTime;
var rootSpeed = script.rootsMaterials.mainPass.rootTime; 

script.rightEyePetalsMaterials.mainPass.matTime=0;
script.rightCheekPetalMaterials.mainPass.matTime=0;
script.rootsMaterials.mainPass.rootTime=0;

//face parts
var countFacePart = 0;
var rightEyeFinish = false;
var rightCheakFinish = false;
var startingFP2 = false;
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


//this is not working - i;m not getting the print
// this is not seeting correctly the triggers. need to thin in other way
//finish face part
var delayedFinishFacePart = script.createEvent("DelayedCallbackEvent");
delayedFinishFacePart.bind(function(){
     if(rightEyeFinish) {
//        startingBackground = true
        rightCheakFinish = true 
    } if (rightEyeFinish && rightCheakFinish) {
        startingFP2 = true
        print('im here')
    }
})


  
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
        delayedFinishFacePart.reset(startWait)
        oldTime = newTime
    }
    
     if (isTalking && (rightEyeSpeed > 0)) {
        script.rightEyePetalsMaterials.mainPass.matTime -= 0.0009;
        updateAvkanState();
        if((startingFP2==true) && (rightCheakSpeed > 0)) {
        script.rightCheekPetalMaterials.mainPass.matTime-=0.0007;
        }
        if(rootSpeed > 0){
        script.rootsMaterials.mainPass.rootTime -= 0.0001;
        }  
        
        //check speed here
    } else if (hasStarted && !isTalking && (rightEyeSpeed < 0.8)) {
        script.rightEyePetalsMaterials.mainPass.matTime += 0.0004;
        updateAvkanState();
        rightEyeFinish =true;
        if(startingFP2==true) {
        script.rightCheekPetalMaterials.mainPass.matTime+=0.0004;
        }
           
            
        if (startingBackground && rootSpeed < 0.4){
            script.rootsMaterials.mainPass.rootTime += 0.00005;
        }
    }
}

var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(onUpdate);


