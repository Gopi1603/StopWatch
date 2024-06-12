let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 0;
let laps = [];

const timeDisplay = document.getElementById('time');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsDisplay = document.getElementById('laps');
const recentLap = document.getElementById('recentLap');
const showMoreLapsBtn = document.getElementById('showMoreLapsBtn');
const allLaps = document.getElementById('allLaps');

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 10); 
        startStopBtn.textContent = 'Pause';
        startStopBtn.style.background = '#ffc107';
        running = true;
    } else {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        startStopBtn.textContent = 'Resume';
        startStopBtn.style.background = '#28a745'; 
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    startTime = null;
    difference = null;
    lapCounter = 0;
    laps = [];
    startStopBtn.textContent = 'Start';
    startStopBtn.style.background = '#28a745'; 
    timeDisplay.textContent = '00:00:00.00';
    recentLap.textContent = '';
    allLaps.innerHTML = '';
    lapsDisplay.classList.add('hidden');
    showMoreLapsBtn.classList.add('hidden');
}

function recordLap() {
    if (running) {
        lapCounter++;
        const lapTime = timeDisplay.textContent;
        laps.push(lapTime);

        recentLap.textContent = `Lap ${lapCounter}: ${lapTime}`;
        
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap ${lapCounter}: ${lapTime}`;
        allLaps.appendChild(lapElement);
        
        lapsDisplay.classList.remove('hidden');
        if (laps.length > 1) {
            showMoreLapsBtn.classList.remove('hidden');
        }
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor(difference / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    milliseconds = (milliseconds < 10) ? '0' + milliseconds : milliseconds;

    timeDisplay.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function toggleLaps() {
    if (allLaps.classList.contains('hidden')) {
        allLaps.classList.remove('hidden');
        showMoreLapsBtn.textContent = 'Show Less';
    } else {
        allLaps.classList.add('hidden');
        showMoreLapsBtn.textContent = 'Show More';
    }
}
