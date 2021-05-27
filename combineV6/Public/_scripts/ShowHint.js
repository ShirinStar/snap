// @input string hintId {"widget":"combobox","values":[{"label":"Why is it so hard to talk?","value":"lens_hint_why_is_it_so_hard_to_talk"},{"label":"How much time past since I last open my mouth?","value":"lens_hint_how_much_time_past_since_I_last_open_my_mouth"}]}
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

// Show the hint
showHint();

function showHint() {

    // Only show hint if it hasn't been shown, if allowing multiple times
    if( !script.hintShown || !script.showOnce ) {

        // Create a delayed callback to show the hint
        var delayEvent = script.createEvent( "DelayedCallbackEvent" );
        delayEvent.bind(function(eventData) {

            print( "Showing Hint: " + script.hintId );
            script.hintComponent.showHint(script.hintId, script.showTime);

        })
        delayEvent.reset(script.delayTime);

        // Mark hint as shown
        script.hintShown = true;
    }

}
