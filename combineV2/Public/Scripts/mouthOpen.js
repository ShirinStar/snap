//@input SceneObject[] growingObjects;
//@input Asset.Material rightEyePetalsMaterials;
//@input Asset.Material rightCheekPetalMaterials;
//@input Asset.Material rootsMaterials;
//@input SceneObject[] avkans;
//@input Component.MeshVisual[] meshVisualPetals;


var timeStampsOpen = []; 
var timeOpen = 0;
var oldTime = 0;
var isTalking = false;
var currentItemIndex = 0;
var countAvkan = 0;
var countPetals = 0;
var updateAvkan = false;
var avkanState = null;
var startWait = 5; //seconds
var longWait = 8; //seconds
var mediumWait = 5; //seconds
var shortWait = 0.5; //seconds
var testTime = 2;
var hasStarted = false;

var rightEyeSpeed = script.rightEyePetalsMaterials.mainPass.matTime;
var rightCheakSpeed = script.rightCheekPetalMaterials.mainPass.matTime;
var rootSpeed = script.rootsMaterials.mainPass.rootTime; 

var currentStep = 0;

var growingSteps = [
    { 
    objName: 'rightEyePetalsMaterials', 
    currentTime: 0,
    maxTime: 0.06
    }, 
    { 
    objName: 'avkans', 
    inProgress: false
    }, 
    { 
    objName: 'rootsMaterials', 
    currentTime: 0,
    maxTime: 0.044
    }, 
]

//when starting everything is off
script.rightEyePetalsMaterials.mainPass.matTime=0;
script.rightCheekPetalMaterials.mainPass.matTime=0;
script.rootsMaterials.mainPass.matTime=0;


for (var i=0; i< script.avkans.length; i++) {
    script.avkans[i].enabled = false;
}

//general app delay
var delayedStart = script.createEvent("DelayedCallbackEvent");
delayedStart.bind(function(){
    hasStarted = true;
})

delayedStart.reset(startWait)

  
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
var hasUpdatedNextStep = false;
var hasUpdatedPrevStep = false;

var delayedNextStep = script.createEvent("DelayedCallbackEvent");
delayedNextStep.bind(function(){
     print('from Next' + currentStep)
    hasUpdatedNextStep =false
    if(currentStep <= growingSteps.length-2) {
        print('inside Next IF')
        currentStep++
    } 
})

var delayedPrevStep = script.createEvent("DelayedCallbackEvent");
delayedPrevStep.bind(function(){
    hasUpdatedPrevStep =false
    print('from Prev' + currentStep)
    if(currentStep > 0 ) {
        currentStep--
    } 
})

function isDoneGrowing(currentMaterial) {
    if(currentMaterial.objName==='rightEyePetalsMaterials') {
       return script[currentMaterial.objName].mainPass.matTime > currentMaterial.maxTime;
    } else if(currentMaterial.objName==='rootsMaterials') {
        return script[currentMaterial.objName].mainPass.matTime > currentMaterial.maxTime;
    } else if(currentMaterial.objName==='avkans') {
        return countAvkan===script.avkans.length -1
    }
}

function takeStep(currentMaterial) {
    if(currentMaterial.objName==='rightEyePetalsMaterials') { 
      return script[currentMaterial.objName].mainPass.matTime += 0.0004;
    } else if (currentMaterial.objName==='rootsMaterials') {
       return script[currentMaterial.objName].mainPass.matTime += 0.0004;
    } else if (currentMaterial.objName ==='avkans') {
        updateAvkanState()
    }
}

function isDoneShrinking(currentMaterial) {
    if(currentMaterial.objName==='rightEyePetalsMaterials') {
       return script[currentMaterial.objName].mainPass.matTime < 0;
    } else if(currentMaterial.objName==='rootsMaterials') {
        return script[currentMaterial.objName].mainPass.matTime < 0;
    } else if(currentMaterial.objName==='avkans') {
        return countAvkan===script.avkans.length -1
    }
}

function reverseStep(currentMaterial) {
    if(currentMaterial.objName==='rightEyePetalsMaterials') { 
      return script[currentMaterial.objName].mainPass.matTime -= 0.0009;
    } else if (currentMaterial.objName==='rootsMaterials') {
       return script[currentMaterial.objName].mainPass.matTime -= 0.0009;
    } else if (currentMaterial.objName ==='avkans') {
        updateAvkanState()
    }
}


//every frame///
function onUpdate (time) {
  newTime = getTime()
  if (newTime - oldTime > 1) {
        isStopSpeaking();
        oldTime = newTime
    }
     var currentMaterial = growingSteps[currentStep]
     if (hasStarted && isTalking) {
       
       if(isDoneShrinking(currentMaterial)) {
            if(!hasUpdatedPrevStep) {
                hasUpdatedPrevStep = true
                delayedPrevStep.reset(testTime)
            }
       } else {
            reverseStep(currentMaterial)
        } 

        } else if (hasStarted && !isTalking) {
         if (isDoneGrowing(currentMaterial)){
            if(!hasUpdatedNextStep) {
                print('updating next step')
                hasUpdatedNextStep =true
                delayedNextStep.reset(testTime)
            }
        } else {
            takeStep(currentMaterial)
        }
       
    }
}

var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(onUpdate);


