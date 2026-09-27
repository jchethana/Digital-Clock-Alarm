const liveClock = document.getElementById("live-clock");
const liveDate = document.getElementById("live-date");
const toggleBtn = document.getElementById("format-toggle");
const alarmForm = document.getElementById("alarm-form");
const alarmList = document.getElementById("alarm-list");
const clearBtn = document.getElementById("clear-all-btn");
let is24Hour = true;
function updateClock() {
    const now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let ampm = "";
    if (!is24Hour) {
        ampm = h >= 12 ? " PM" : " AM";
        h = h % 12;
        h = h ? h : 12; 
    }
    let displayH = h < 10 ? '0' + h : h;
    let displayM = m < 10 ? '0' + m : m;
    let displayS = s < 10 ? '0' + s : s;
    liveClock.innerHTML = displayH + ":" + displayM + ":" + displayS + ampm;
    liveDate.innerHTML = now.toDateString();
    checkAlarms(displayH + ":" + displayM); 
}
updateClock();
setInterval(updateClock, 1000);
toggleBtn.addEventListener("click", function() {
    is24Hour = !is24Hour;
    toggleBtn.innerHTML = is24Hour ? "Switch to 12H" : "Switch to 24H";
    updateClock();
});
alarmForm.addEventListener("submit", function(event) {
    event.preventDefault(); 
    const time = document.getElementById("alarm-time").value;
    const label = document.getElementById("alarm-label").value;
    if (time === "") {
        alert("Please pick a time!");
        return;
    }
    const newAlarm = document.createElement("li");
    newAlarm.innerHTML = `<b>${time}</b> - ${label || "Alarm"}`;
    if (alarmList.innerHTML.includes("No alarms")) {
        alarmList.innerHTML = "";
    }
    alarmList.appendChild(newAlarm);
    alarmForm.reset();
});
clearBtn.addEventListener("click", function() {
    alarmList.innerHTML = "<li>No alarms set.</li>";
});
function checkAlarms(currentTime) {
    const alarmItems = alarmList.querySelectorAll("li");
    alarmItems.forEach(function(item) {
        const alarmTime = item.querySelector("b").innerHTML;
        if (alarmTime === currentTime) {
            setTimeout(function() {
                alert("🔔 ALARM! " + item.innerHTML);
                item.remove(); 
                if (alarmList.innerHTML === "") {
                    alarmList.innerHTML = "<li>No alarms set.</li>";
                }
            }, 100);
        }
    });
}