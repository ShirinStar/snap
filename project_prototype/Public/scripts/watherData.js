// @input SceneObject koterWeather
// @input Component.MaterialMeshVisual flowerTex
// @input Asset.Material[] flowerMaterial
// @input  SceneObject HeadBinding

script.koterWeather.enabled = false;
var userContextSystem = global.userContextSystem;
//var sun = true;

userContextSystem.requestWeatherCondition(function(weather) {
    print(weather)
    if (weather == WeatherCondition.Rainy) {
        script.koterWeather.enabled = true
    }
});


