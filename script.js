let timerInterval = null;
let elapsedTime = 0;
let isRunning = false;

const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const resetButton = document.getElementById('reset-button');
const display = document.getElementById('stopwatch-display');

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = ms % 1000;

    return [
        String(hours).padStart(2, '0'),
        String(minutes).padStart(2, '0'),
        String(seconds).padStart(2, '0'),
        String(milliseconds).padStart(3, '0').slice(0, 2) // Display centiseconds
    ].join(':');
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        const startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
    }
}

function stopTimer() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerInterval);
    }
}

function resetTimer() {
    stopTimer();
    elapsedTime = 0;
    updateDisplay();
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

// Initial display update
updateDisplay();
