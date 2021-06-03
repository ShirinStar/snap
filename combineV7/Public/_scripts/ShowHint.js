// @input string hintId {"widget":"combobox","values":[{"label":"how much time has passed since the last time I opened my mouth?","value":"lens_hint_how_much_time_has_passed_since_the_last_time_I_opened_my_mouth"},{"label":"Time is the longest distance between two places","value":"lens_hint_Time_is_the_longest_distance_between_two_places"}]}
// @input float showTime = 2.0 {"label": "Show Time"}
// @input float delayTime {"label": "Delay Time"}
// @input bool showOnce = true {"label": "Show Once"}

// Initialize hints
if( !script.initialized ) {

    // Create the hint component
    script.hintComponent = script.getSceneObject().createComponent( "Component.HintsComponent" );

    // Initialize done
    script.hintShown = false;
    script.initialized = true;
}

showHint();

function showHint() {
    if( !script.hintShown || !script.showOnce ) {

        var delayEvent = script.createEvent( "DelayedCallbackEvent" );
        delayEvent.bind(function(eventData) {

            print( "Showing Hint: " + script.hintId );
            script.hintComponent.showHint(script.hintId, script.showTime);

        })
        delayEvent.reset(script.delayTime);

        script.hintShown = true;
    }

}
