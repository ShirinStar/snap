// @input SceneObject koterWeather
// @input Component.MaterialMeshVisual flowerTex
// @input Asset.Material[] flowerMaterial
// @input  SceneObject HeadBinding


//changing texture by tap
var count = 0;
script.flowerTex.mainMaterial = script.flowerMaterial[0]

function onTap(eventData) {
    count++;
    if(count >= script.flowerMaterial.length) {
        count = 0;
    }
    script.flowerTex.mainMaterial = script.flowerMaterial[count]
}

var event = script.createEvent('TapEvent');
event.bind(onTap)

