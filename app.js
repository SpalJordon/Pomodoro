const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const message = document.getElementById("message");
const subtitle = document.getElementById("subtitle"); 
const timer = document.getElementById("timer");
const dragon = document.getElementById("dragon");
const flying = document.getElementById("flying");
const locationImg = document.getElementById("location");
const minutesInput = document.getElementById("minutes");

let interval;
let timeLeft = 1500;

const flightFrames = ["sprite flight-1", "sprite flight-2", "sprite flight-3", "sprite flight-4", "sprite flight-5", "sprite flight-6", "sprite flight-7", "sprite flight-8", "sprite flight-9", "sprite flight-10", "sprite flight-11"];
const restFrames = ["sprite Rest-1", "sprite Rest-2", "sprite Rest-3", "sprite Rest-4", "sprite Rest-5", "sprite Rest-6", "sprite Rest-7"];
let frameIndex = 0;
let animInterval = null;

let backgroundIndex = 0;

const locations = [
    "images/castle.png",
];

let locationIndex = 0;

const dingSound = new Audio("sounds/ding.mp3");

function showNewLocation() {
    locationImg.src = locations[locationIndex];
    locationImg.style.display = "block";
    locationIndex = (locationIndex + 1) % locations.length;
}

function updateTimer() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    let formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    timer.innerHTML = formattedTime;
}

function playFrames(frames, speed) {
    clearInterval(animInterval); 
    frameIndex = 0;
    dragon.className = frames[frameIndex];
    if (frames === flightFrames) {
        dragon.classList.add("flying");
    } else {
        dragon.classList.remove("flying");
    }
    animInterval = setInterval(() => {
        frameIndex = (frameIndex + 1) % frames.length;
        dragon.className = frames[frameIndex];
        if (frames === flightFrames) {
            dragon.classList.add("flying");
        }
    }, speed);
}
let isPaused = false;
function startTimer() {
    dragon.style.display = "block";
    message.style.display = "none";
    subtitle.style.display = "none";
    locationImg.style.display = "none";
    playFrames(flightFrames, 150);

    dingSound.play().then(() => {
        dingSound.pause();
        dingSound.currentTime = 0;
    }).catch(() => {});

    if (!isPaused) {
        timeLeft = Number(minutesInput.value) * 60;
    }
    isPaused = false;

    updateTimer();
    interval = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
            clearInterval(interval);
            interval = null;
            playFrames(restFrames, 300);
            subtitle.style.display = "none";
            message.style.display = "block";
            showNewLocation();
            dingSound.currentTime = 0;
            dingSound.play();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(interval);
    interval = null;
    isPaused = true;
    playFrames(restFrames, 300);
    subtitle.style.display = "block";
}

function resetTimer() {
    stopTimer();
    isPaused = false;
    timeLeft = Number(minutesInput.value) * 60;
    message.style.display = "none";
    updateTimer();
}
start.addEventListener("click", startTimer);
stop.addEventListener("click", stopTimer);
reset.addEventListener("click", resetTimer);

dragon.style.display = "block";
playFrames(restFrames, 300);
