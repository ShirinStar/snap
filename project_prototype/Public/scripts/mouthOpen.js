// @input Component.MeshVisual meshVisual;
// @input Asset.Material materials;

var timeStampsOpen = []; 
var timeOpen = 0;
var oldTime = 0;
var isTaking = false;
var currentItemIndex = 0;
  
function onMouthOpened() {
    timeOpen = getTime();
    timeStampsOpen.push(timeOpen);  
    
    timeStampsLongArray =  timeStampsOpen.filter(function (time) { return time > (timeOpen-10)});
    print("fast" + timeStampsLongArray)
    
    if (timeStampsLongArray.length >= 3 ) {
        isTaking = true;
        print(script.materials.mainPass.matTime)
    }  
}

var mouthOpenedEvent = script.createEvent("MouthOpenedEvent");
mouthOpenedEvent.bind(onMouthOpened);

  
function isStopSpeaking() {
    timeStampsShortArray =  timeStampsOpen.filter(function (time) { return time > (getTime()-5)});
    print("slow" + timeStampsShortArray)   
    if (timeStampsShortArray.length <= 1) {
        isTaking = false;
        timeStampsOpen = []
    }  
 }

var speed = script.materials.mainPass.matTime

function onUpdate (time) {
  newTime = getTime()
  if (newTime - oldTime > 1) {
        isStopSpeaking();
        oldTime = newTime
    }
     if(isTaking && speed > 0) {
     script.materials.mainPass.matTime -=0.0003
    } else if (!isTaking && speed < 0.5) {
        script.materials.mainPass.matTime +=0.0003
    }
}

var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(onUpdate);
