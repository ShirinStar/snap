//@input float startDelayTime = 30.00;
//@input Asset.Material greenLeavesGroup1;
//@input Asset.Material greenLeavesGroup2;
//@input Asset.Material greenLeavesGroup3;
//@input Asset.Material greenLeavesGroup4;
//@input Asset.Material greenLeavesGroup5;
//@input SceneObject[] littleFlowerGroup1;
//@input SceneObject[] littleFlowerGroup2;
//@input SceneObject[] avkans;
//@input Asset.Texture faceEyeAnimation;
//@input Asset.Texture faceCheekAnimation;
//@input Asset.Texture whiteBG;
//@input Asset.Texture[] BgBranchesAnimation;
//@input SceneObject extraRightEye;
//@input SceneObject extraLeftEye;
//@input Asset.Material rightEyePetalsMaterials;
//@input SceneObject occluder;

var timeStampsOpen = []; 
var timeOpen = 0;
var timeNotTalking = 0;
var timeStampsClose = [];
var oldTime = 0;
var isTalking = false;

var countAvkan = 0;
var updateAvkan = false;
var avkanState = null;

var countLittleFlowerOne = 0;
var updateLittleFlower1 = false;
var LittleFlowerState1 = null;

var countLittleFlowerTwo = 0;
var updateLittleFlower2 = false;
var LittleFlowerState2 = null;

var branchesPlaying = false;
var countBranches = 0;

var loops = 1;
var offset = 0.0;
var faceEyePlaying = false;
var faceCheekPlaying = false;
var bgPlaying= false;
var startGreenLeaves = false;
var bigEyeGrow = false;
var occluderOff = false;

var startWait = script.startDelayTime; 
var timeBetweenSteps = 5;
var timeBetweenShrinking = 5
var timeBetweenAvkan = 0.5; //seconds
var timeBetweenLittleFlower = 3
var timeBetweenBranches = 3

var timeBetweenStart = 0;

var hasStarted = false;
var hasUpdatedNextStep = false;
var hasUpdatedPrevStep = false;

var currentStep = 0;

var growingSteps = [
    { 
    objName: 'greenLeavesGroup1', 
    currentTime: 0,
    maxTime: 0.06
    },
    { 
    objName: 'spacer1', 
    waitTime: 10
    }, 
     { 
    objName: 'greenLeavesGroup2', 
    currentTime: 0,
    maxTime: 0.06
    },
    { 
    objName: 'spacer2',  
    waitTime: 5
    }, 
    { 
    objName: 'littleFlowerGroup1', 
    inProgress: false
    }, 
     { 
    objName: 'greenLeavesGroup3', 
    currentTime: 0,
    maxTime: 0.06
    },
    { 
    objName: 'spacer3',  
    waitTime: 5
    }, 
    { 
    objName: 'greenLeavesGroup4', 
    currentTime: 0,
    maxTime: 0.06
    },
    { 
    objName: 'spacer4',  
    waitTime: 8
    }, 
    { 
    objName: 'greenLeavesGroup5', 
    currentTime: 0,
    maxTime: 0.06
    },
    { 
    objName: 'spacer5',  
    waitTime: 5
    }, 
   { 
    objName: 'littleFlowerGroup2', 
    inProgress: false
    }, 
    { 
    objName: 'spacer6',  
    waitTime: 15
    }, 
    { 
     objName: 'faceCheekAnimation', 
      inProgress: false
    }, 
    { 
    objName: 'spacer7', 
    waitTime: 8
    }, 
    { 
    objName: 'avkans', 
    inProgress: false
    }, 
    { 
    objName: 'spacer8', 
    waitTime: 10
    },
    { 
     objName: 'faceEyeAnimation', 
      inProgress: false
    }, 
    { 
    objName: 'spacer9', 
    waitTime: 15
    }, 
    { 
     objName: 'BgBranchesAnimation', 
      inProgress: false
    }, 
    { 
    objName: 'spacer10', 
    waitTime: 12
    }, 
    { 
    objName: 'rightEyePetalsMaterials', 
    currentTime: 0,
    maxTime: 0.06
    },
    { 
    objName: 'spacer11', 
    waitTime: 10
    },  
    { 
     objName: 'whiteBG', 
     currentTime: 0,
     maxTime: 1
    }
]


//when starting - everything is off
script.greenLeavesGroup1.mainPass.matTime=0;
script.greenLeavesGroup2.mainPass.matTime=0;
script.greenLeavesGroup3.mainPass.matTime=0;
script.greenLeavesGroup4.mainPass.matTime=0;
script.greenLeavesGroup5.mainPass.matTime=0;

for (var i=0; i< script.littleFlowerGroup1.length; i++) {
    script.littleFlowerGroup1[i].enabled = false;
}

for (var i=0; i< script.littleFlowerGroup2.length; i++) {
    script.littleFlowerGroup2[i].enabled = false;
}

for (var i=0; i< script.avkans.length; i++) {
    script.avkans[i].enabled = false;
}

script.faceEyeAnimation.control.play(loops, offset);
script.faceEyeAnimation.control.pause();
script.faceCheekAnimation.control.play(loops, offset);
script.faceCheekAnimation.control.pause();

for (var i=0; i< script.BgBranchesAnimation.length; i++) {
    script.BgBranchesAnimation[i].control.play(loops, offset);
    script.BgBranchesAnimation[i].control.pause();
}

script.whiteBG.control.play(loops, offset);
script.whiteBG.control.pause();
script.extraRightEye.enabled = false;
script.extraLeftEye.enabled = false;
script.rightEyePetalsMaterials.mainPass.matTime=0;

//occluder on
script.occluder.enabled = true;


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
    //print("calculating talking" + timeStampsLongArray);
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


//AVKAN//
var delayedAvkan = script.createEvent("DelayedCallbackEvent");
delayedAvkan.bind(function(){
    showAvkan();
})

function updateAvkanState() {
    if(updateAvkan===false) {
       updateAvkan = true;
        avkanState = isTalking;
       delayedAvkan.reset(timeBetweenSteps);
    }            
}

function showAvkan() {
    if(countAvkan < script.avkans.length) {
        script.avkans[countAvkan].enabled = !avkanState;
        delayedAvkan.reset(timeBetweenAvkan);
        countAvkan++;
    } else {
        countAvkan = 0;
        updateAvkan =false;
    }
}

//littleFlower 
var delayedLittleFlowerOne = script.createEvent("DelayedCallbackEvent");
delayedLittleFlowerOne.bind(function(){
    showLittleFlowerOne();
})

function updateLittleFlowerStateOne() {
    if(updateLittleFlower1===false) {
       updateLittleFlower1 = true;
       LittleFlowerState1 = isTalking;
       delayedLittleFlowerOne.reset(timeBetweenSteps);
    }            
}

function showLittleFlowerOne() {
    if(countLittleFlowerOne < script.littleFlowerGroup1.length) {
        script.littleFlowerGroup1[countLittleFlowerOne].enabled = !LittleFlowerState1;
        delayedLittleFlowerOne.reset(timeBetweenLittleFlower);
        countLittleFlowerOne++;
    } else {
        countLittleFlowerOne  = 0;
        updateLittleFlower1 =false;
    }
}

var delayedLittleFlowerTwo = script.createEvent("DelayedCallbackEvent");
delayedLittleFlowerTwo.bind(function(){
    showLittleFlowerTwo();
})

function updateLittleFlowerStateTwo() {
    if(updateLittleFlower2===false) {
       updateLittleFlower2 = true;
       LittleFlowerState2 = isTalking;
       delayedLittleFlowerTwo.reset(timeBetweenSteps);
    }            
}

function showLittleFlowerTwo() {
    if(countLittleFlowerTwo < script.littleFlowerGroup2.length) {
        script.littleFlowerGroup2[countLittleFlowerTwo].enabled = !LittleFlowerState2;
        delayedLittleFlowerTwo.reset(timeBetweenLittleFlower);
        countLittleFlowerTwo++;
    } else {
        countLittleFlowerTwo  = 0;
        updateLittleFlower2 =false;
    }
}

//faceAnimation 
function faceEyeGrowing() {
   if(!faceEyePlaying) {
        script.faceEyeAnimation.control.play(loops, offset);
        script.faceEyeAnimation.control.isReversed= false
        faceEyePlaying = true;
    }
}

function faceEyeShrinking() {
    if(faceEyePlaying) {
    script.faceEyeAnimation.control.play(loops, offset);
    script.faceEyeAnimation.control.isReversed= true
    faceEyePlaying = false
    }
}

function faceCheekGrowing() {
   if(!faceCheekPlaying) {
        script.faceCheekAnimation.control.play(loops, offset);
        script.faceCheekAnimation.control.isReversed= false
        faceCheekPlaying = true;
    }
}

function faceCheekShrinking() {
    if(faceCheekPlaying) {
    script.faceCheekAnimation.control.play(loops, offset);
    script.faceCheekAnimation.control.isReversed= true
    faceCheekPlaying = false;
    }
}


//bgColor
var delayedOccluder = script.createEvent("DelayedCallbackEvent");
delayedOccluder.bind(function(){
    script.occluder.enabled = false;
})

var delayedOccluderAppear = script.createEvent("DelayedCallbackEvent");
delayedOccluderAppear.bind(function(){
    script.occluder.enabled = true;
    script.extraLeftEye.enabled = false;
})

function bgColorShow() {
    if(!bgPlaying) {
        script.whiteBG.control.play(loops, offset);
        script.whiteBG.control.isReversed= false;
        script.extraLeftEye.enabled = true;
        delayedOccluder.reset(2)
        bgPlaying = true;
    }
}

function bgColorNotShow() {
    if(bgPlaying) {
        script.whiteBG.control.play(loops, offset);
        script.whiteBG.control.isReversed= true;
        script.occluder.enabled = true;
        
        delayedOccluderAppear.reset(1)
        bgPlaying = false;
    }
}

//bgBrances
var delayedBranchesGrow = script.createEvent("DelayedCallbackEvent");
delayedBranchesGrow.bind(function(){
    BranchesGrowing();
})

var delayedBranchesShrink = script.createEvent("DelayedCallbackEvent");
delayedBranchesShrink.bind(function(){
    BranchesShrinking();
})

function updateBranchesGrow() {
    if(!branchesPlaying) {
       branchesPlaying = true;
       delayedBranchesGrow.reset(timeBetweenSteps);
    }            
}

function updateBranchesShrink() {
    if(branchesPlaying) {
       branchesPlaying = false;
       delayedBranchesShrink.reset(timeBetweenSteps);
    }            
}

function BranchesGrowing() {
        if(countBranches < script.BgBranchesAnimation.length) {
            script.BgBranchesAnimation[countBranches].control.play(loops, offset);
             script.BgBranchesAnimation[countBranches].control.isReversed = false
            delayedBranchesGrow.reset(timeBetweenBranches)
            countBranches++
          } else {
            countBranches = 0
            branchesPlaying = true;
        }
    }

function BranchesShrinking() {
         if(countBranches < script.BgBranchesAnimation.length) {
            script.BgBranchesAnimation[countBranches].control.play(loops, offset);
             script.BgBranchesAnimation[countBranches].control.isReversed = true
            delayedBranchesShrink.reset(timeBetweenBranches)
            countBranches++
          } else {
            countBranches = 0
            branchesPlaying = false;
        }
    }


//bigEye 
var delayedExtraEyeOut = script.createEvent("DelayedCallbackEvent");
delayedExtraEyeOut.bind(function(){
     script.extraRightEye.enabled = false;
})

function checkExtraEye() {
    if(!bigEyeGrow) {
       delayedExtraEyeOut.reset(4)
    } else {
        script.extraRightEye.enabled = true;
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
    if (currentMaterial.objName==='greenLeavesGroup1') { 
       return script[currentMaterial.objName].mainPass.matTime > currentMaterial.maxTime;
    } else if (currentMaterial.objName==='spacer1') {
        return (getTime() - timeBetweenStart) > currentMaterial.waitTime;
    } else if (currentMaterial.objName==='greenLeavesGroup2') { 
       return script[currentMaterial.objName].mainPass.matTime > currentMaterial.maxTime;
    } else if (currentMaterial.objName==='spacer2') {
        return (getTime() - timeBetweenStart) > currentMaterial.waitTime;
    } else if (currentMaterial.objName==='greenLeavesGroup3') { 
       return script[currentMaterial.objName].mainPass.matTime > currentMaterial.maxTime;
    } else if (currentMaterial.objName==='spacer3') {
        return (getTime() - timeBetweenStart) > currentMaterial.waitTime;
    } else if (currentMaterial.objName==='greenLeavesGroup4') { 
       return script[currentMaterial.objName].mainPass.matTime > currentMaterial.maxTime;
    } else if (currentMaterial.objName==='spacer4') {
        return (getTime() - timeBetweenStart) > currentMaterial.waitTime;
    } else if (currentMaterial.objName==='greenLeavesGroup5') { 
       return script[currentMaterial.objName].mainPass.matTime > currentMaterial.maxTime;
    } else if (currentMaterial.objName==='spacer5') {
        return (getTime() - timeBetweenStart) > currentMaterial.waitTime;
    }else if (currentMaterial.objName==='littleFlowerGroup1') {
        return countLittleFlowerOne ===script.littleFlowerGroup1.length -1;
    }  else if (currentMaterial.objName==='littleFlowerGroup2') {
        return countLittleFlowerTwo ===script.littleFlowerGroup2.length -1;
    } else if (currentMaterial.objName==='spacer6') {
        return (getTime() - timeBetweenStart) > currentMaterial.waitTime;
    } else if (currentMaterial.objName==='faceCheekAnimation') {
         return faceCheekPlaying == true;
    }  else if (currentMaterial.objName==='spacer7') {
        return (getTime() - timeBetweenStart) > currentMaterial.waitTime
    } else if (currentMaterial.objName==='avkans') {
        return countAvkan===script.avkans.length -1;
    } else if (currentMaterial.objName==='spacer8') {
        return (getTime() - timeBetweenStart) > currentMaterial.waitTime
    } else if (currentMaterial.objName==='faceEyeAnimation') {
         return faceEyePlaying == true;
    }  else if (currentMaterial.objName==='spacer9') {
        return (getTime() - timeBetweenStart) > currentMaterial.waitTime
    }  else if (currentMaterial.objName==='BgBranchesAnimation') {
         return branchesPlaying == true;
    }  else if (currentMaterial.objName==='spacer10') {
        return (getTime() - timeBetweenStart) > currentMaterial.waitTime
    } else if (currentMaterial.objName==='whiteBG') {
        return bgPlaying == true;
    }  else if (currentMaterial.objName==='spacer11') {
        return (getTime() - timeBetweenStart) > currentMaterial.waitTime
    } else if (currentMaterial.objName==='rightEyePetalsMaterials') {
       return script[currentMaterial.objName].mainPass.matTime > currentMaterial.maxTime;
    } 
}

//what needs to happen with every material increase
function takeStep(currentMaterial) {
   if (currentMaterial.objName==='greenLeavesGroup1') { 
        return script.greenLeavesGroup1.mainPass.matTime += 0.0002;
    } else if (currentMaterial.objName==='greenLeavesGroup2') { 
        return script.greenLeavesGroup2.mainPass.matTime += 0.0002;
    }  else if (currentMaterial.objName==='greenLeavesGroup3') { 
        return script.greenLeavesGroup3.mainPass.matTime += 0.0002;
    }  else if (currentMaterial.objName==='greenLeavesGroup4') { 
        return script.greenLeavesGroup4.mainPass.matTime += 0.0002;
    }  else if (currentMaterial.objName==='greenLeavesGroup5') { 
        return script.greenLeavesGroup5.mainPass.matTime += 0.0002;
    }else if (currentMaterial.objName ==='littleFlowerGroup1') {
        updateLittleFlowerStateOne();
    } else if (currentMaterial.objName ==='littleFlowerGroup2') {
        updateLittleFlowerStateTwo();
    }  else if (currentMaterial.objName==='faceCheekAnimation') {
        faceCheekGrowing();
    } else if (currentMaterial.objName ==='avkans') {
        updateAvkanState();
    } else if (currentMaterial.objName==='faceEyeAnimation') {
        faceEyeGrowing();
    }  else if (currentMaterial.objName==='BgBranchesAnimation') {
        updateBranchesGrow();
    } else if (currentMaterial.objName==='whiteBG') {
        bgColorShow();
    } else if (currentMaterial.objName==='rightEyePetalsMaterials') { 
        script[currentMaterial.objName].mainPass.matTime += 0.0002;
        bigEyeGrow = true;
        checkExtraEye();
    }  
}

//checking status srinking
function isDoneShrinking(currentMaterial) {
    if (currentMaterial.objName==='greenLeavesGroup1') { 
      return script[currentMaterial.objName].mainPass.matTime < 0;
    } else if (currentMaterial.objName==='spacer1') {
        return (getTime() - timeBetweenStart) > timeBetweenShrinking;
    } else if (currentMaterial.objName==='greenLeavesGroup2') { 
      return script[currentMaterial.objName].mainPass.matTime < 0;
    } else if (currentMaterial.objName==='spacer2') {
        return (getTime() - timeBetweenStart) > timeBetweenShrinking;
    } else if (currentMaterial.objName==='greenLeavesGroup3') { 
      return script[currentMaterial.objName].mainPass.matTime < 0;
    } else if (currentMaterial.objName==='spacer3') {
        return (getTime() - timeBetweenStart) > timeBetweenShrinking;
    } else if (currentMaterial.objName==='greenLeavesGroup4') { 
      return script[currentMaterial.objName].mainPass.matTime < 0;
    } else if (currentMaterial.objName==='spacer4') {
        return (getTime() - timeBetweenStart) > timeBetweenShrinking;
    } else if (currentMaterial.objName==='greenLeavesGroup5') { 
      return script[currentMaterial.objName].mainPass.matTime < 0;
    } else if (currentMaterial.objName==='spacer5') {
        return (getTime() - timeBetweenStart) > timeBetweenShrinking;
    } else if (currentMaterial.objName==='littleFlowerGroup1') {
        return countLittleFlowerOne ===script.littleFlowerGroup1.length -1;
    } else if (currentMaterial.objName==='littleFlowerGroup2') {
        return countLittleFlowerTwo ===script.littleFlowerGroup2.length -1;
    } else if (currentMaterial.objName==='spacer6') {
        return (getTime() - timeBetweenStart) > timeBetweenShrinking;
    } else if (currentMaterial.objName==='faceCheekAnimation') {
         return faceCheekPlaying == false;
    }  else if (currentMaterial.objName==='spacer7') {
        return (getTime() - timeBetweenStart) > currentMaterial.waitTime
    } else if (currentMaterial.objName==='avkans') {
        return countAvkan===script.avkans.length -1;
    } else if (currentMaterial.objName==='spacer8') {
        return (getTime() - timeBetweenStart) > timeBetweenShrinking;
    }  else if (currentMaterial.objName==='faceEyeAnimation') {
       return faceEyePlaying == false;
    }  else if (currentMaterial.objName==='spacer9') {
        return (getTime() - timeBetweenStart) > timeBetweenShrinking;
    }  else if (currentMaterial.objName==='BgBranchesAnimation') {
         return branchesPlaying == false;
    }  else if (currentMaterial.objName==='spacer10') {
        return (getTime() - timeBetweenStart) > currentMaterial.waitTime
    } else if (currentMaterial.objName==='whiteBG') {
        return bgPlaying == false;
    }  else if (currentMaterial.objName==='spacer11') {
        return (getTime() - timeBetweenStart) > timeBetweenShrinking;
    } else if (currentMaterial.objName==='rightEyePetalsMaterials') {
        return script[currentMaterial.objName].mainPass.matTime < 0;
    }
}

//what needs to happen with every material decrease
function reverseStep(currentMaterial) {
    if (currentMaterial.objName==='greenLeavesGroup1') { 
       return script.greenLeavesGroup1.mainPass.matTime -= 0.0006;
    } else if (currentMaterial.objName==='greenLeavesGroup2') { 
       return script.greenLeavesGroup2.mainPass.matTime -= 0.0006;
    }  else if (currentMaterial.objName==='greenLeavesGroup3') { 
       return script.greenLeavesGroup3.mainPass.matTime -= 0.0006;
    }  else if (currentMaterial.objName==='greenLeavesGroup4') { 
       return script.greenLeavesGroup4.mainPass.matTime -= 0.0006;
    }  else if (currentMaterial.objName==='greenLeavesGroup5') { 
       return script.greenLeavesGroup5.mainPass.matTime -= 0.0006;
    } else if (currentMaterial.objName ==='littleFlowerGroup1') {
        updateLittleFlowerStateOne();
    }  else if (currentMaterial.objName ==='littleFlowerGroup2') {
        updateLittleFlowerStateTwo();
    }  else if (currentMaterial.objName==='faceCheekAnimation') {
        faceCheekShrinking();
    } else if (currentMaterial.objName ==='avkans') {
        updateAvkanState();
    }  else if (currentMaterial.objName==='faceEyeAnimation') {
       faceEyeShrinking();
    }  else if (currentMaterial.objName==='BgBranchesAnimation') {
        updateBranchesShrink();
    } else if (currentMaterial.objName==='whiteBG') {
       bgColorNotShow();
    } else if (currentMaterial.objName==='rightEyePetalsMaterials') { 
        script[currentMaterial.objName].mainPass.matTime -= 0.0005;
        bigEyeGrow = false;
        checkExtraEye();
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
                delayedPrevStep.reset(timeBetweenSteps);
                timeBetweenStart = getTime()
            }
        } else {
            reverseStep(currentMaterial);
        } 
        
    } else if (hasStarted && !isTalking) { 
        if (isDoneGrowing(currentMaterial)) {
            if(!hasUpdatedNextStep) {
                hasUpdatedNextStep = true;
                delayedNextStep.reset(timeBetweenSteps);
                timeBetweenStart = getTime()
               
            }
        } else {
            takeStep(currentMaterial);
        }
    }
}

var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(onUpdate);