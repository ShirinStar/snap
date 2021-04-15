// @input Component.MeshVisual meshVisual;
// @input Asset.Material[] materials;
// input SceneObject long_root;

//script.long_root.enabled = false;
var timeStampsOpen = []; 
var timeOpen = 0;
var oldTime = 0;

var currentItemIndex = 0;
// Function to clear the current materials and add a new one
function setMaterial(material){
 script.meshVisual.clearMaterials();
 script.meshVisual.addMaterial(material);
}

setMaterial(script.materials[currentItemIndex]);

  
function onMouthOpened() {
    timeOpen = getTime();
    timeStampsOpen.push(timeOpen);  
    
    timeStampsLongArray =  timeStampsOpen.filter(function (time) { return time > (timeOpen-10)});
    print("fast" + timeStampsLongArray)
    if (currentItemIndex == 1 && timeStampsLongArray.length >= 3 ) {
        currentItemIndex = 0;
        setMaterial(script.materials[currentItemIndex]);
    }  
}

var mouthOpenedEvent = script.createEvent("MouthOpenedEvent");
mouthOpenedEvent.bind(onMouthOpened);

  
function isStopSpeaking() {
    timeStampsShortArray =  timeStampsOpen.filter(function (time) { return time > (getTime()-5)});
    print("slow" + timeStampsShortArray)   
    if (currentItemIndex == 0  && timeStampsShortArray.length <= 1) {
        currentItemIndex = 1;
        setMaterial(script.materials[currentItemIndex]);
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