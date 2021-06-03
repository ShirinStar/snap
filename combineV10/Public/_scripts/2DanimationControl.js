// -----JS CODE-----
// //@input Asset.Texture faceAnimation
//@input Asset.Texture faceEyeAnimation;
//@input Asset.Texture faceCheekAnimation;

var loops = 1;
var offset = 0.0;

//script.faceMesh.enabled =true

script.faceCheekAnimation.control.play(loops, offset);
//script.faceCheekAnimation.control.pause()
//script.faceCheekAnimation.control.isReversed= true



//var updateEvent = script.createEvent("UpdateEvent");
//updateEvent.bind(function(eventData)
//{
// var currentFrameIndex = script.faceAnimation.control.getCurrentPlayingFrame();
//
//if (currentFrameIndex == 1) {
// script.faceAnimation.control.pause();
// }
//});