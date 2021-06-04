// @input Asset.Material flowerMaterial
// @input Asset.Material littleFlower
// @input Component.Text textComponent

//script.flowerMaterial.mainPass.flowerTexture = script.flowerTextures[currentTextureIndex];

function getTimeZone() {
    var offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
    return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
}

script.textComponent.text = 'GMT ' + getTimeZone()

function changeFlowerTex() {
    
    if (getTimeZone() === '-12:00') {
        script.flowerMaterial.mainPass.flowerColor = new vec4(1.0, 1.0, 1.0, 1.0);
        script.littleFlower.mainPass.baseColor = new vec4(1.0, 1.0, 1.0, 1.0);
        script.textComponent.dropshadowSettings.fill.color = new vec4(1.0, 1.0, 1.0, 1.0);
    } else if (getTimeZone() === '-11:00') {
        script.flowerMaterial.mainPass.flowerColor = new vec4(0.98, 0.92, 0.96, 1.0);
        script.littleFlower.mainPass.baseColor = new vec4(0.98, 0.92, 0.96, 1.0);
        script.textComponent.dropshadowSettings.fill.color = new vec4(0.98, 0.92, 0.96, 1.0);
    } else if (getTimeZone() === '-10:00') {
        script.flowerMaterial.mainPass.flowerColor = new vec4(0.985, 0.896, 0.939, 1.0);
        script.littleFlower.mainPass.baseColor = new vec4(0.985, 0.896, 0.939, 1.0);
        script.textComponent.dropshadowSettings.fill.color = new vec4(0.985, 0.896, 0.939, 1.0);
    } else if (getTimeZone() === '-09:00') {
        script.flowerMaterial.mainPass.flowerColor = new vec4(0.998, 0.809, 0.947, 1.0);
        script.littleFlower.mainPass.baseColor = new vec4(0.998, 0.809, 0.947, 1.0);
        script.textComponent.dropshadowSettings.fill.color = new vec4(0.998, 0.809, 0.947, 1.0);
    } else if (getTimeZone() === '-08:00') {
        script.flowerMaterial.mainPass.flowerColor = new vec4(1, 0.788, 0.942, 1.0);
        script.littleFlower.mainPass.baseColor = new vec4(1, 0.788, 0.942, 1.0);
        script.textComponent.dropshadowSettings.fill.color = new vec4(1, 0.788, 0.942, 1.0);
    } else if (getTimeZone() === '-07:00') {
        script.flowerMaterial.mainPass.flowerColor = new vec4(0.98, 0.768, 0.979, 1.0);
        script.littleFlower.mainPass.baseColor = new vec4(0.98, 0.768, 0.979, 1.0);
        script.textComponent.dropshadowSettings.fill.color = new vec4(0.98, 0.768, 0.979, 1.0);
    } else if (getTimeZone() === '-06:00') {
         script.flowerMaterial.mainPass.flowerColor = new vec4(1, 0.63, 0.984, 1.0);
         script.littleFlower.mainPass.baseColor = new vec4(1, 0.63, 0.984, 1.0);
         script.textComponent.dropshadowSettings.fill.color = new vec4(1, 0.63, 0.984, 1.0);
    } else if (getTimeZone() === '-05:00') {
         script.flowerMaterial.mainPass.flowerColor = new vec4(0.977, 0.51, 0.99, 1.0);
         script.littleFlower.mainPass.baseColor = new vec4(0.977, 0.51, 0.99, 1.0);
         script.textComponent.dropshadowSettings.fill.color = new vec4(0.977, 0.51, 0.99, 1.0);
    } else if (getTimeZone() === '-04:00') {
         script.flowerMaterial.mainPass.flowerColor = new vec4(0.977, 0.49, 0.987, 1.0);
         script.littleFlower.mainPass.baseColor = new vec4(0.977, 0.49, 0.987, 1.0);
         script.textComponent.dropshadowSettings.fill.color = new vec4(0.977, 0.49, 0.987, 1.0);
    } else if (getTimeZone() === '-03:00') {
         script.flowerMaterial.mainPass.flowerColor = new vec4(1, 0.439, 0.828, 1.0);
         script.littleFlower.mainPass.baseColor = new vec4(1, 0.439, 0.828, 1.0);
         script.textComponent.dropshadowSettings.fill.color = new vec4(1, 0.439, 0.828, 1.0);
    } else if (getTimeZone() === '-02:00') {
         script.flowerMaterial.mainPass.flowerColor = new vec4(1, 0.443, 0.696, 1.0);
         script.littleFlower.mainPass.baseColor = new vec4(1, 0.443, 0.696, 1.0);
         script.textComponent.dropshadowSettings.fill.color = new vec4(1, 0.443, 0.696, 1.0);
    } else if (getTimeZone() === '-01:00') {
         script.flowerMaterial.mainPass.flowerColor = new vec4(0.995, 0.494, 0.644, 1.0);
         script.littleFlower.mainPass.baseColor = new vec4(0.995, 0.494, 0.644, 1.0);
         script.textComponent.dropshadowSettings.fill.color = new vec4(0.995, 0.494, 0.644, 1.0);
    } else if (getTimeZone() === '00:00') {
        script.flowerMaterial.mainPass.flowerColor = new vec4(0.991, 0.539, 0.573, 1.0);
        script.littleFlower.mainPass.baseColor = new vec4(0.991, 0.539, 0.573, 1.0);
        script.textComponent.dropshadowSettings.fill.color = new vec4(0.991, 0.539, 0.573, 1.0);
    } else if (getTimeZone() === '01:00') {
        script.flowerMaterial.mainPass.flowerColor = new vec4(0.987, 0.575, 0.51, 1.0);
        script.littleFlower.mainPass.baseColor = new vec4(0.987, 0.575, 0.51, 1.0);
        script.textComponent.dropshadowSettings.fill.color = new vec4(0.987, 0.575, 0.51, 1.0);
    } else if (getTimeZone() === '02:00') {
        script.flowerMaterial.mainPass.flowerColor = new vec4(0.99, 0.466, 0.457, 1.0);
        script.littleFlower.mainPass.baseColor = new vec4(0.99, 0.466, 0.457, 1.0);
        script.textComponent.dropshadowSettings.fill.color = new vec4(0.99, 0.466, 0.457, 1.0);
    } else if (getTimeZone() === '03:00') {
        script.flowerMaterial.mainPass.flowerColor = new vec4(0.986, 0.583, 0.434, 1.0);
        script.littleFlower.mainPass.baseColor = new vec4(0.986, 0.583, 0.434, 1.0);
        script.textComponent.dropshadowSettings.fill.color = new vec4(0.986, 0.583, 0.434, 1.0);
    } else if (getTimeZone() === '04:00') {
        script.flowerMaterial.mainPass.flowerColor = new vec4(0.983, 0.617, 0.338, 1.0);
        script.littleFlower.mainPass.baseColor = new vec4(0.983, 0.617, 0.338, 1.0);
        script.textComponent.dropshadowSettings.fill.color = new vec4(0.983, 0.617, 0.338, 1.0);
    } else if (getTimeZone() === '05:00') {
        script.flowerMaterial.mainPass.flowerColor = new vec4(0.976, 0.675, 0.205, 1.0);
        script.littleFlower.mainPass.baseColor = new vec4(0.976, 0.675, 0.205, 1.0);
        script.textComponent.dropshadowSettings.fill.color = new vec4(0.976, 0.675, 0.205, 0.15);
    } else if (getTimeZone() === '06:00') {
        script.flowerMaterial.mainPass.flowerColor = new vec4(0.987, 0.589, 0.195, 1.0);
        script.littleFlower.mainPass.baseColor = new vec4(0.987, 0.589, 0.195, 1.0);
        script.textComponent.dropshadowSettings.fill.color = new vec4(0.987, 0.589, 0.195, 1.0);
    } else if (getTimeZone() === '07:00') {
         script.flowerMaterial.mainPass.flowerColor = new vec4(1, 0.464, 0.186, 1.0);
         script.littleFlower.mainPass.baseColor = new vec4(1, 0.464, 0.186, 1.0);
         script.textComponent.dropshadowSettings.fill.color = new vec4(1, 0.464, 0.186, 1.0);
    } else if (getTimeZone() === '08:00') {
         script.flowerMaterial.mainPass.flowerColor = new vec4(0.99, 0.560, 0.04, 1.0);
         script.littleFlower.mainPass.baseColor = new vec4(0.99, 0.560, 0.04, 1.0);
         script.textComponent.dropshadowSettings.fill.color = new vec4(0.99, 0.560, 0.04, 1.0);
    } else if (getTimeZone() === '09:00') {
         script.flowerMaterial.mainPass.flowerColor = new vec4(1, 0.43, 0.063, 1.0);
         script.littleFlower.mainPass.baseColor =  new vec4(1, 0.43, 0.063, 1.0);
         script.textComponent.dropshadowSettings.fill.color = new vec4(1, 0.43, 0.063, 1.0);
    } else if (getTimeZone() === '10:00') {
         script.flowerMaterial.mainPass.flowerColor = new vec4(1, 0.249, 0.029, 1.0);
         script.littleFlower.mainPass.baseColor =  new vec4(1, 0.249, 0.029, 1.0);
         script.textComponent.dropshadowSettings.fill.color = new vec4(1, 0.249, 0.029, 1.0);
    } else if (getTimeZone() === '11:00') {
         script.flowerMaterial.mainPass.flowerColor = new vec4(1, 0.095, 0, 1.0);
         script.littleFlower.mainPass.baseColor = new vec4(1, 0.095, 0, 1.0);
         script.textComponent.dropshadowSettings.fill.color = new vec4(1, 0.095, 0, 1.0);
    } else if (getTimeZone() === '12:00') {
         script.flowerMaterial.mainPass.flowerColor = new vec4(1, 0, 0, 1.0);
         script.littleFlower.mainPass.baseColor = new vec4(1, 0, 0, 1.0);
         script.textComponent.dropshadowSettings.fill.color = new vec4(1, 0, 0, 1.0);
    } else {
        script.flowerMaterial.mainPass.flowerColor = new vec4(0.987, 0.575, 0.51, 1.0);
        script.littleFlower.mainPass.baseColor = new vec4(0.987, 0.575, 0.51, 1.0);
        script.textComponent.dropshadowSettings.fill.color = new vec4(0.987, 0.575, 0.51, 1.0);
    }
    //script.flowerMaterial.mainPass.flowerTexture = script.flowerTextures[currentTextureIndex];
}


function onUpdate (time) { 
    changeFlowerTex();   
}


var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(onUpdate);

