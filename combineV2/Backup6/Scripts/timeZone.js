
var currentDate = new Date();
print("Today is: " + global.localizationSystem.getDayOfWeek(currentDate));
//this print UTC time zone. 
print("The current time is: " + global.localizationSystem.getTimeFormatted(currentDate));

//this convert timezone.  (PST is === -7:00) // (EST is === -4:00)
function getTimeZone() {
    var offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
    return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
}

print(getTimeZone())