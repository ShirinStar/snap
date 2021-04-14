// @input Component.MaterialMeshVisual flowerTex
// @input Asset.Material[] flowerMaterial
// @input  SceneObject HeadBinding

script.HeadBinding.enabled = false;
var timeStampsOpen = []; 
var timeOpen = 0;
var oldTime = 0;

  
function onMouthOpened() {
    timeOpen = getTime();
    timeStampsOpen.push(timeOpen);  
    
    timeStampsLongArray =  timeStampsOpen.filter(function (time) { return time > (timeOpen-10)});
    print(timeStampsLongArray)
    if (timeStampsLongArray.length >= 3 ) {
        script.HeadBinding.enabled = true;
    }  
}

var mouthOpenedEvent = script.createEvent("MouthOpenedEvent");
mouthOpenedEvent.bind(onMouthOpened);

  
function isStopSpeaking() {
    timeStampsShortArray =  timeStampsOpen.filter(function (time) { return time > (getTime()-5)});
    if (script.HeadBinding.enabled  && timeStampsShortArray.length <= 1) {
        script.HeadBinding.enabled = false;
        timeStampsOpen = []
    }  
 }

function onUpdate (time) {
  newTime = getTime()
  if (newTime - oldTime > 1) {
        isStopSpeaking();
        oldTime = newTime
    }
}

var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(onUpdate);