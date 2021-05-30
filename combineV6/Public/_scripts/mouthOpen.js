
//@input Asset.Material greenLeaves;
//@input SceneObject[] littleFlower;
//@input SceneObject[] avkans;
//@input Asset.Texture faceAnimation
//@input Asset.Material bgColor;
//@input Asset.Material backgroundMaterials;
//@input SceneObject extraEye;
//@input Asset.Material rightEyePetalsMaterials;

var timeStampsOpen = []; 
var timeOpen = 0;
var oldTime = 0;
var isTalking = false;

var countAvkan = 0;
var updateAvkan = false;
var avkanState = null;

var countLittleFlower = 0;
var updateLittleFlower = false;
var LittleFlowerState = null;

var loops = 1;
var offset = 0.0;
var facePlaying = false;

var bgPlaying= false;

var bigEyeGrow = false;

var startWait = 1; //seconds
var longWait = 8; //seconds
var mediumWait = 5; //seconds
var shortWait = 0.5; //seconds

var hasStarted = false;
var hasUpdatedNextStep = false;
var hasUpdatedPrevStep = false;

var currentStep = 0;

var growingSteps = [

    { 
    objName: 'greenLeaves', 
    currentTime: 0,
    maxTime: 0.06
    },
    { 
    objName: 'littleFlower', 
    inProgress: false
    }, 
    { 
    objName: 'avkans', 
    inProgress: false
    }, 
     { 
     objName: 'faceAnimation', 
      currentTime: 0,
      maxTime: 0.06
    }, 
    { 
     objName: 'bgColor', 
     currentTime: 0,
     maxTime: 1
    }, 
    { 
    objName: 'rightEyePetalsMaterials', 
    currentTime: 0,
    maxTime: 0.06
    } 
]

//when starting - everything is off
script.greenLeaves.mainPass.matTime=0;
for (var i=0; i< script.littleFlower.length; i++) {
    script.littleFlower[i].enabled = false;
}

for (var i=0; i< script.avkans.length; i++) {
    script.avkans[i].enabled = false;
}
script.faceAnimation.control.play(loops, offset);
script.faceAnimation.control.pause()
script.bgColor.mainPass.animation=0;
script.backgroundMaterials.mainPass.matTime=0;
script.extraEye.enabled = false;
script.rightEyePetalsMaterials.mainPass.matTime=0;


//general app delay
var delayedStart = script.createEvent("DelayedCallbackEvent");
delayedStart.bind(function(){
    hasStarted = true;
})

delayedStart.reset(startWait);


  
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
///

//littleFlower 
var delayedLittleFlower = script.createEvent("DelayedCallbackEvent");
delayedLittleFlower.bind(function(){
    showLittleFlower();
})

function updateLittleFlowerState() {
    if(updateLittleFlower===false) {
       updateLittleFlower = true;
       LittleFlowerState = isTalking;
       delayedLittleFlower.reset(mediumWait);
    }            
}

function showLittleFlower() {
    if(countLittleFlower < script.littleFlower.length) {
        script.littleFlower[countLittleFlower].enabled = !LittleFlowerState;
        delayedLittleFlower.reset(shortWait);
        countLittleFlower++;
    } else {
        countLittleFlower = 0;
        updateLittleFlower =false;
    }
}

//var delayedFace = script.createEvent("DelayedCallbackEvent");
//delayedFace.bind(function(){
//    faceGrowing();
//})


//faceAnimation 
function faceGrowing() {
   if(!facePlaying) {
        script.faceAnimation.control.play(loops, offset);
        script.faceAnimation.control.isReversed= false
        facePlaying = true;
    }
}

function faceShrinking() {
    if(facePlaying) {
    script.faceAnimation.control.play(loops, offset);
    script.faceAnimation.control.isReversed= true
    facePlaying = false
    }
}
//

//bgColor
function bgColorShow() {
    if(!bgPlaying) {
        script.bgColor.mainPass.animation = 1;
        bgPlaying = true
    }
}

function bgColorNotShow() {
    if(bgPlaying) {
        script.bgColor.mainPass.animation = 0;
        bgPlaying = false
    }
}

//bigEye 
var delayedExtraEyeOut = script.createEvent("DelayedCallbackEvent");
delayedExtraEyeOut.bind(function(){
     script.extraEye.enabled = false;
})

function checkExtraEye() {
    if(!bigEyeGrow) {
       delayedExtraEyeOut.reset(3)
    } else {
        script.extraEye.enabled = true;
    }
}

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
    if (currentMaterial.objName==='greenLeaves') { 
       return script[currentMaterial.objName].mainPass.matTime > currentMaterial.maxTime;
    } else if (currentMaterial.objName==='littleFlower') {
        return countLittleFlower===script.littleFlower.length -1;
    } else if (currentMaterial.objName==='avkans') {
        return countAvkan===script.avkans.length -1;
    } else if (currentMaterial.objName==='faceAnimation') {
         return facePlaying == true
    }  else if (currentMaterial.objName==='bgColor') {
        return bgPlaying == true;
    } else if (currentMaterial.objName==='rightEyePetalsMaterials') {
       return script[currentMaterial.objName].mainPass.matTime > currentMaterial.maxTime;
    } 
}

//what needs to happen with every material increase
function takeStep(currentMaterial) {
   if (currentMaterial.objName==='greenLeaves') { 
      return script[currentMaterial.objName].mainPass.matTime += 0.0002;
    } else if (currentMaterial.objName ==='littleFlower') {
        updateLittleFlowerState();
    } else if (currentMaterial.objName ==='avkans') {
        updateAvkanState();
    } else if (currentMaterial.objName==='faceAnimation') {
        faceGrowing()
    }  else if (currentMaterial.objName==='bgColor') {
        bgColorShow()
    } else if (currentMaterial.objName==='rightEyePetalsMaterials') { 
        script[currentMaterial.objName].mainPass.matTime += 0.0002;
        bigEyeGrow = true;
        checkExtraEye()
    }  
}

//checking status srinking
function isDoneShrinking(currentMaterial) {
    if (currentMaterial.objName==='greenLeaves') { 
      return script[currentMaterial.objName].mainPass.matTime < 0;
    } else if (currentMaterial.objName==='littleFlower') {
        return countLittleFlower===script.littleFlower.length -1;
    } else if (currentMaterial.objName==='avkans') {
        return countAvkan===script.avkans.length -1;
    }  else if (currentMaterial.objName==='faceAnimation') {
       return facePlaying == false;
    }  else if (currentMaterial.objName==='bgColor') {
        return bgPlaying == false;
    } else if (currentMaterial.objName==='rightEyePetalsMaterials') {
        return script[currentMaterial.objName].mainPass.matTime < 0;
    }
}

//what needs to happen with every material decrease
function reverseStep(currentMaterial) {
    if (currentMaterial.objName==='greenLeaves') { 
      return script[currentMaterial.objName].mainPass.matTime -= 0.0006;
    } else if (currentMaterial.objName ==='littleFlower') {
        updateLittleFlowerState();
    } else if (currentMaterial.objName ==='avkans') {
        updateAvkanState();
    }  else if (currentMaterial.objName==='faceAnimation') {
       faceShrinking()
    }  else if (currentMaterial.objName==='bgColor') {
       bgColorNotShow()
    } else if (currentMaterial.objName==='rightEyePetalsMaterials') { 
        script[currentMaterial.objName].mainPass.matTime -= 0.0006;
        bigEyeGrow = false;
        checkExtraEye()
    } 
}


//every frame///
function onUpdate (time) {
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


