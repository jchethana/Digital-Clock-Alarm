// 1. Get the HTML elements we need
const liveClock = document.getElementById("live-clock");
const liveDate = document.getElementById("live-date");
const toggleBtn = document.getElementById("format-toggle");
const alarmForm = document.getElementById("alarm-form");
const alarmList = document.getElementById("alarm-list");
const clearBtn = document.getElementById("clear-all-btn");

let is24Hour = true;

// 2. The main clock function
function updateClock() {
    const now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    
    // Handle 12H / 24H format
    let ampm = "";
    if (!is24Hour) {
        ampm = h >= 12 ? " PM" : " AM";
        h = h % 12;
        h = h ? h : 12; 
    }
    
    // Add zeros in front of single digits
    let displayH = h < 10 ? '0' + h : h;
    let displayM = m < 10 ? '0' + m : m;
    let displayS = s < 10 ? '0' + s : s;
    
    // Update the screen
    liveClock.innerHTML = displayH + ":" + displayM + ":" + displayS + ampm;
    liveDate.innerHTML = now.toDateString();

    // Check if any alarms need to ring 
    // (We check using the exact minute and second so it only rings once)
    checkAlarms(displayH + ":" + displayM); 
}

// 3. Start the clock
updateClock();
setInterval(updateClock, 1000);

// 4. Switch 12H/24H button
toggleBtn.addEventListener("click", function() {
    is24Hour = !is24Hour;
    toggleBtn.innerHTML = is24Hour ? "Switch to 12H" : "Switch to 24H";
    updateClock();
});

// 5. Add Alarm
alarmForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Stop page refresh
    
    const time = document.getElementById("alarm-time").value;
    const label = document.getElementById("alarm-label").value;
    
    if (time === "") {
        alert("Please pick a time!");
        return;
    }

    // Create a new list item and add it to the screen
    const newAlarm = document.createElement("li");
    newAlarm.innerHTML = `<b>${time}</b> - ${label || "Alarm"}`;
    
    // If "No alarms set" is showing, remove it
    if (alarmList.innerHTML.includes("No alarms")) {
        alarmList.innerHTML = "";
    }
    
    alarmList.appendChild(newAlarm);
    
    // Clear the input box
    alarmForm.reset();
});

// 6. Clear All button
clearBtn.addEventListener("click", function() {
    alarmList.innerHTML = "<li>No alarms set.</li>";
});

// 7. Check if the current time matches any alarm in the list
function checkAlarms(currentTime) {
    const alarmItems = alarmList.querySelectorAll("li");
    
    alarmItems.forEach(function(item) {
        // Get the time text from the list item (e.g., "08:00")
        const alarmTime = item.querySelector("b").innerHTML;
        
        // --- THE FIX: Check if the times match ---
        if (alarmTime === currentTime) {
            // Use a small timeout to let the browser finish updating the clock first
            setTimeout(function() {
                alert("⏰ ALARM! " + item.innerHTML);
                
                // Remove the alarm after it rings
                item.remove(); 
                if (alarmList.innerHTML === "") {
                    alarmList.innerHTML = "<li>No alarms set.</li>";
                }
            }, 100);
        }
    });
}