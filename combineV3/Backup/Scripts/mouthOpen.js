//@input Asset.Material rightEyePetalsMaterials;
//@input Asset.Material whitePetalsMaterials;
//@input Asset.Material rootsMaterials;
//@input SceneObject[] avkans;
// //@input SceneObject greenFaceMesh;
//@input Component.MeshVisual[] meshVisualPetals;

var timeStampsOpen = []; 
var timeOpen = 0;
var oldTime = 0;
var isTalking = false;

var countAvkan = 0;
var updateAvkan = false;
var avkanState = null;

var startWait = 5; //seconds
var longWait = 8; //seconds
var mediumWait = 5; //seconds
var shortWait = 0.5; //seconds

var hasStarted = false;
var hasUpdatedNextStep = false;
var hasUpdatedPrevStep = false;

var currentStep = 0;

var growingSteps = [
    { 
    objName: 'rightEyePetalsMaterials', 
    currentTime: 0,
    maxTime: 0.06
    },
    { 
    objName: 'whitePetalsMaterials', 
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

//when starting - everything is off
script.rightEyePetalsMaterials.mainPass.matTime=0;
script.whitePetalsMaterials.mainPass.matTime=0;
script.rootsMaterials.mainPass.matTime=0;


for (var i=0; i< script.avkans.length; i++) {
    script.avkans[i].enabled = false;
}

//general app delay
var delayedStart = script.createEvent("DelayedCallbackEvent");
delayedStart.bind(function(){
    hasStarted = true;
})

delayedStart.reset(startWait);

/////TIME ZONE//////
var currentTextureIndex = script.rightEyePetalsMaterials;

function getTimeZone() {
    var offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
    return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
}

print(getTimeZone())

var PST = '-07:00';
var CT = '-05:00';//central
var EST = '-04:00';

function changeMaterialTimeZone() {
    if (getTimeZone() === PST) {
        for (var i = 0 ; i < script.meshVisualPetals.length; i++) {
        script.meshVisualPetals[i].mainMaterial  = script.whitePetalsMaterials;
        }
    } 
    else if (getTimeZone() === CT) {
        for (var i = 0 ; i < script.meshVisualPetals.length; i++) {
        script.meshVisualPetals[i].mainMaterial  = script.rightEyePetalsMaterials;
        }
    } else {
        for (var i = 0 ; i < script.meshVisualPetals.length; i++) {
       script.meshVisualPetals[i].mainMaterial  = script.rightEyePetalsMaterials; 
        }
    }
 }
////////////


  
//general MOUTH OPEN//
global.onMouthOpened = function() {
    timeOpen = getTime();
    timeStampsOpen.push(timeOpen);  
    
    timeStampsLongArray =  timeStampsOpen.filter(function (time) { return time > (timeOpen-20)});
    print("calculating talking" + timeStampsLongArray);
    if (timeStampsLongArray.length >= 2 ) {
        isTalking = true;
    }  
}

var mouthOpenedEvent = script.createEvent("MouthOpenedEvent");
mouthOpenedEvent.bind(onMouthOpened);

function isStopSpeaking() {
    timeStampsShortArray =  timeStampsOpen.filter(function (time) { return time > (getTime()-15)});
    print("calculating not talking" + timeStampsShortArray) ;  
    if (timeStampsShortArray.length == 0) {
        isTalking = false;
        timeStampsOpen = [];
    }  
 }


//AVKAN// showing one by one
var delayedAvkan = script.createEvent("DelayedCallbackEvent");
delayedAvkan.bind(function(){
    showAvkan();
})

function updateAvkanState() {
    if(updateAvkan===false) {
       updateAvkan = true;
        avkanState = isTalking;
       delayedAvkan.reset(mediumWait);
    }            
}

function showAvkan() {
    if(countAvkan < script.avkans.length) {
        script.avkans[countAvkan].enabled = !avkanState;
        delayedAvkan.reset(shortWait);
        countAvkan++;
    } else {
        countAvkan = 0;
        updateAvkan =false;
    }
}
///END AVKAN


//setting time of delay to increase + validating update next step
var delayedNextStep = script.createEvent("DelayedCallbackEvent");
delayedNextStep.bind(function(){
    hasUpdatedNextStep =false;
    if(currentStep <= growingSteps.length-2) {
        currentStep++;
    } 
})

//setting time of delay to decrease + validating update prev step
var delayedPrevStep = script.createEvent("DelayedCallbackEvent");
delayedPrevStep.bind(function(){
    hasUpdatedPrevStep =false;
    if(currentStep > 0 ) {
        currentStep--;
    } 
})

//checking status growing
function isDoneGrowing(currentMaterial) {
    if (currentMaterial.objName==='rightEyePetalsMaterials') {
       return script[currentMaterial.objName].mainPass.matTime > currentMaterial.maxTime;
    } else if (currentMaterial.objName==='whitePetalsMaterials') {
        return script[currentMaterial.objName].mainPass.matTime > currentMaterial.maxTime;
    } else if (currentMaterial.objName==='rootsMaterials') {
        return script[currentMaterial.objName].mainPass.matTime > currentMaterial.maxTime;
    } else if (currentMaterial.objName==='avkans') {
        return countAvkan===script.avkans.length -1;
    }  
}

//what needs to happen with every material increase
function takeStep(currentMaterial) {
    if (currentMaterial.objName==='rightEyePetalsMaterials') { 
      return script[currentMaterial.objName].mainPass.matTime += 0.0002;
    } else if (currentMaterial.objName==='whitePetalsMaterials') { 
      return script[currentMaterial.objName].mainPass.matTime += 0.0002;
    } else if (currentMaterial.objName==='rootsMaterials') {
       return script[currentMaterial.objName].mainPass.matTime += 0.0001;
    } else if (currentMaterial.objName ==='avkans') {
        updateAvkanState();
    }  
}

//checking status srinking
function isDoneShrinking(currentMaterial) {
    if (currentMaterial.objName==='rightEyePetalsMaterials') {
       return script[currentMaterial.objName].mainPass.matTime < 0;
    } else if (currentMaterial.objName==='whitePetalsMaterials') {
       return script[currentMaterial.objName].mainPass.matTime < 0;
    } else if (currentMaterial.objName==='rootsMaterials') {
        return script[currentMaterial.objName].mainPass.matTime < 0;
    } else if (currentMaterial.objName==='avkans') {
        return countAvkan===script.avkans.length -1;
    } 
}

//what needs to happen with every material decrease
function reverseStep(currentMaterial) {
    if (currentMaterial.objName==='rightEyePetalsMaterials') { 
      return script[currentMaterial.objName].mainPass.matTime -= 0.0006;
    } else if (currentMaterial.objName==='whitePetalsMaterials') { 
      return script[currentMaterial.objName].mainPass.matTime -= 0.0006;
    } else if (currentMaterial.objName==='rootsMaterials') {
       return script[currentMaterial.objName].mainPass.matTime -= 0.0002;
    } else if (currentMaterial.objName ==='avkans') {
        updateAvkanState();
    } 
}


//every frame///
function onUpdate (time) {
  changeMaterialTimeZone();
    
  newTime = getTime();
  if (newTime - oldTime > 1) {
        isStopSpeaking();
        oldTime = newTime;
    }
     var currentMaterial = growingSteps[currentStep]
     if (hasStarted && isTalking) {
       
       if(isDoneShrinking(currentMaterial)) {
            if(!hasUpdatedPrevStep) {
                hasUpdatedPrevStep = true;
                delayedPrevStep.reset(mediumWait);
            }
        } else {
            reverseStep(currentMaterial);
        } 
        
    } else if (hasStarted && !isTalking) { 
        if (isDoneGrowing(currentMaterial)) {
            if(!hasUpdatedNextStep) {
                print('updating next step')
                hasUpdatedNextStep =true;
                delayedNextStep.reset(mediumWait);
            }
        } else {
            takeStep(currentMaterial);
        }
    }
}

var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(onUpdate);


