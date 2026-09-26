const liveClock = document.getElementById('live-clock');
const liveDate = document.getElementById('live-date');
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    const timeString = `${hours}:${minutes}:${seconds}`;
    liveClock.innerHTML = timeString;
    liveDate.innerHTML = now.toDateString();
}
updateClock();
setInterval(updateClock, 1 * 1000);