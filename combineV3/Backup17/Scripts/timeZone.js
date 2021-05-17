// @input Asset.Material flowerMaterial
// @input Asset.Texture[] flowerTextures

var currentTextureIndex = 12;
script.flowerMaterial.mainPass.flowerTexture = script.flowerTextures[currentTextureIndex];

function getTimeZone() {
    var offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
    return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
}

print(getTimeZone())

function changeFlowerTex() {
    
    if (getTimeZone() === '-12:00') {
        currentTextureIndex = 0;
    } else if (getTimeZone() === '-11:00') {
        currentTextureIndex = 1;
    } else if (getTimeZone() === '-10:00') {
        currentTextureIndex = 2;
    } else if (getTimeZone() === '-09:00') {
        currentTextureIndex = 3;
    } else if (getTimeZone() === '-08:00') {
        currentTextureIndex = 4;
    } else if (getTimeZone() === '-07:00') {
        currentTextureIndex = 5;
    } else if (getTimeZone() === '-06:00') {
        currentTextureIndex = 6;
    } else if (getTimeZone() === '-05:00') {
        currentTextureIndex = 7;
    } else if (getTimeZone() === '-04:00') {
        currentTextureIndex = 8;
    } else if (getTimeZone() === '-03:00') {
        currentTextureIndex = 9;
    } else if (getTimeZone() === '-02:00') {
        currentTextureIndex = 10;
    } else if (getTimeZone() === '-01:00') {
        currentTextureIndex = 11;
    } else if (getTimeZone() === '00:00') {
        currentTextureIndex = 12;
    } else if (getTimeZone() === '01:00') {
        currentTextureIndex = 13;
    } else if (getTimeZone() === '02:00') {
        currentTextureIndex = 14;
    } else if (getTimeZone() === '03:00') {
        currentTextureIndex = 15;
    } else if (getTimeZone() === '04:00') {
        currentTextureIndex = 16;
    } else if (getTimeZone() === '05:00') {
        currentTextureIndex = 17;
    } else if (getTimeZone() === '06:00') {
        currentTextureIndex = 18;
    } else if (getTimeZone() === '07:00') {
        currentTextureIndex = 19;
    } else if (getTimeZone() === '08:00') {
        currentTextureIndex = 20;
    } else if (getTimeZone() === '09:00') {
        currentTextureIndex = 21;
    } else if (getTimeZone() === '10:00') {
        currentTextureIndex = 22;
    } else if (getTimeZone() === '11:00') {
        currentTextureIndex = 23;
    } else if (getTimeZone() === '12:00') {
        currentTextureIndex = 24;
    } else {
        currentTextureIndex = 12;
    }
    
    script.flowerMaterial.mainPass.flowerTexture = script.flowerTextures[currentTextureIndex];
   
}


function onUpdate (time) { 
    changeFlowerTex();   
}


var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(onUpdate);

