// Digital Clock
function updateClock() {
  const clockEl = document.getElementById('digital-clock');
  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  clockEl.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(num) {
  return num.toString().padStart(2, '0');
}

setInterval(updateClock, 1000);
updateClock();

// Stopwatch
let swInterval;
let swTime = 0;
const swDisplay = document.getElementById('stopwatch');
const swStartBtn = document.getElementById('sw-start');
const swPauseBtn = document.getElementById('sw-pause');
const swResetBtn = document.getElementById('sw-reset');

swStartBtn.addEventListener('click', () => {
  swStartBtn.disabled = true;
  swPauseBtn.disabled = false;
  swResetBtn.disabled = false;

  swInterval = setInterval(() => {
    swTime++;
    swDisplay.textContent = formatStopwatch(swTime);
  }, 1000);
});

swPauseBtn.addEventListener('click', () => {
  swStartBtn.disabled = false;
  swPauseBtn.disabled = true;
  clearInterval(swInterval);
});

swResetBtn.addEventListener('click', () => {
  swStartBtn.disabled = false;
  swPauseBtn.disabled = true;
  swResetBtn.disabled = true;
  clearInterval(swInterval);
  swTime = 0;
  swDisplay.textContent = '00:00:00';
});

function formatStopwatch(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
}

// Timer
let timerInterval;
let timerTime = 0;
const timerDisplay = document.getElementById('timer');
const timerMinutesInput = document.getElementById('timer-minutes');
const timerSecondsInput = document.getElementById('timer-seconds');
const timerStartBtn = document.getElementById('timer-start');
const timerPauseBtn = document.getElementById('timer-pause');
const timerResetBtn = document.getElementById('timer-reset');

timerStartBtn.addEventListener('click', () => {
  let mins = parseInt(timerMinutesInput.value) || 0;
  let secs = parseInt(timerSecondsInput.value) || 0;

  timerTime = mins * 60 + secs;

  if (timerTime <= 0) return alert('Please enter a valid time.');

  updateTimerDisplay(timerTime);

  timerStartBtn.disabled = true;
  timerPauseBtn.disabled = false;
  timerResetBtn.disabled = false;
  timerMinutesInput.disabled = true;
  timerSecondsInput.disabled = true;

  timerInterval = setInterval(() => {
    timerTime--;
    updateTimerDisplay(timerTime);

    if (timerTime <= 0) {
      clearInterval(timerInterval);
      alert('Time is up!');
      timerStartBtn.disabled = false;
      timerPauseBtn.disabled = true;
      timerResetBtn.disabled = true;
      timerMinutesInput.disabled = false;
      timerSecondsInput.disabled = false;
    }
  }, 1000);
});

timerPauseBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  timerStartBtn.disabled = false;
  timerPauseBtn.disabled = true;
});

timerResetBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  timerTime = 0;
  updateTimerDisplay(timerTime);
  timerStartBtn.disabled = false;
  timerPauseBtn.disabled = true;
  timerResetBtn.disabled = true;
  timerMinutesInput.disabled = false;
  timerSecondsInput.disabled = false;
  timerMinutesInput.value = '';
  timerSecondsInput.value = '';
});

function updateTimerDisplay(seconds) {
  let mins = Math.floor(seconds / 60);
  let secs = seconds % 60;
  timerDisplay.textContent = `${pad(mins)}:${pad(secs)}`;
}
