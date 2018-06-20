// Pull sections of document as needed for script
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

    // Establish timer rollover
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
    let originTextMatch = originText.substring(0,textEntered.length);  // Substring of full sample text to match to current input from user

    // If complete change box to green, otherwise continue to compare for accuracy
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
    mastHeader.style.backgroundColor = "#23272A";          // Changes header background
    introHeader.style.backgroundColor = "#23272A";         // Changes secondary header background
    document.body.style.backgroundColor = "#2C2F33";       // Changes body background
    testArea.style.backgroundColor = "#2C2F33";            // Changes textbox background
    document.getElementById('p2').style.color = "white";   // Changes sample text font color
    document.getElementById('p3').style.color = "white";   // Changes words per minute font color
    theTimer.style.color = "white";                        // Changes timer font color
    sampleText.style.backgroundColor = "#23272A";          // Changes sample text box color
    nightModeButton.innerHTML= "Day Mode";                 // Changes 'Night Mode' text to 'Day Mode'
    testArea.style.color = "white";                        // Changes textbox font color
}

// Turn on Day Mode:
function dayModeOn(){
    mastHeader.style.backgroundColor = "#0947C2";          // Changes header background
    introHeader.style.backgroundColor = "#3e77e9";         // Changes secondary header background
    document.body.style.backgroundColor = "white";         // Changes body background
    testArea.style.backgroundColor = "white";              // Changes textbox background
    document.getElementById('p2').style.color = "black";   // Changes sample text font color
    document.getElementById('p3').style.color = "black";   // Changes words per minute font color
    theTimer.style.color = "black";                        // Changes timer font color
    sampleText.style.backgroundColor = "#EDEDED";          // Changes sample text box color
    nightModeButton.innerHTML= "Night Mode";               // Changes 'Day Mode' text to 'Night Mode'
    testArea.style.color = "black";                        // Changes textbox font color
}

// Decide whether to turn on day or night mode:
function nightModeToggle(){
    modeCount++;
    modeCount%2 == 0 ? dayModeOn() : nightModeOn();
}

// Event listeners for keyboard input and the reset/night mode buttons:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
nightModeButton.addEventListener("click", nightModeToggle, false);
