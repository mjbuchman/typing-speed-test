const mastHeader = document.querySelector(".masthead");
const introHeader = document.querySelector(".intro");
const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#sample-text p").innerHTML;
const sampleText = document.querySelector("#sample-text");
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const wordsPerMinute = document.querySelector("#wpm p");
const nightModeButton = document.querySelector("#night-mode");

var timer = [0,0,0,0];
var interval;
var timerRunning = false;
var modeCount = 0;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// Find the number of words per minute in the most recent speed test:
function findWordsPerMinute(){
    let minutes = timer[0] + timer[1]/60;
    let wpm = Math.floor(34/minutes);
    wordsPerMinute.innerHTML = "Words per minute: " + wpm;
}
// Match the text entered with the provided text on the page:
function spellCheck() {
    let textEntered = testArea.value;
    let originTextMatch = originText.substring(0,textEntered.length);

    if (textEntered == originText) {
        findWordsPerMinute();
        clearInterval(interval);
        testWrapper.style.borderColor = "#4fc775";
    } else {
        if (textEntered == originTextMatch) {
            testWrapper.style.borderColor = "#808080";
        } else {
            testWrapper.style.borderColor = "#ff5952";
        }
    }

}

// Start the timer:
function start() {
    let textEnteredLength = testArea.value.length;
    if (textEnteredLength === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
}

// Reset everything:
function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
    wordsPerMinute.innerHTML = "Words per minute: 0";
}

// Turn on Night Mode:
function nightModeOn(){
    mastHeader.style.backgroundColor = "#23272A";
    introHeader.style.backgroundColor = "#23272A";
    document.body.style.backgroundColor = "#2C2F33";
    testArea.style.backgroundColor = "#2C2F33";
    document.getElementById('p1').style.color = "white";
    document.getElementById('p2').style.color = "white";
    document.getElementById('p3').style.color = "white";
    theTimer.style.color = "white";
    testWrapper.style.color = "white";
    sampleText.style.backgroundColor = "#23272A";
    //nightModeButton.style.background = "#2C2F33";
    nightModeButton.innerHTML= "Day Mode";
    //resetButton.style.background = "#2C2F33";
    testArea.style.color = "white";
}

// Turn on Day Mode:
function dayModeOn(){
    mastHeader.style.backgroundColor = "#0947C2";
    introHeader.style.backgroundColor = "#3e77e9";
    document.body.style.backgroundColor = "white";
    testArea.style.backgroundColor = "white";
    document.getElementById('p1').style.color = "black";
    document.getElementById('p2').style.color = "black";
    document.getElementById('p3').style.color = "black";
    theTimer.style.color = "black";
    testWrapper.style.color = "black";
    sampleText.style.backgroundColor = "#EDEDED";
    //nightModeButton.style.background = "white";
    nightModeButton.innerHTML= "Night Mode";
    //resetButton.style.background = "white";
    testArea.style.color = "black";
}

// Decide whether to turn on day or night mode:
function nightModeToggle(){
    modeCount++;
    modeCount%2 == 0 ? dayModeOn() : nightModeOn();
}

// Event listeners for keyboard input and the reset:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
nightModeButton.addEventListener("click", nightModeToggle, false);
