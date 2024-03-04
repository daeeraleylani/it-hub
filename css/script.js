function toggleModo() {
    var body = document.body;
    var navbar = document.getElementById('test');
    var modoBtn = document.getElementById('modoBtn');
    

    if (body.classList.contains('dark-mode')) {
      body.classList.remove('dark-mode');
      navbar.classList.remove('navbar-light', 'bg-light');
      navbar.classList.add('navbar-dark', 'bg-dark');
      modoBtn.textContent = '';
      modoBtn.insertAdjacentHTML('beforeend', '<i class="bi bi-moon-stars-fill"></i>');
    } else {

      body.classList.add('dark-mode');
      navbar.classList.remove('navbar-dark', 'bg-dark');
      navbar.classList.add('navbar-light', 'bg-light');
      modoBtn.textContent = '';
      modoBtn.insertAdjacentHTML('beforeend', '<i class="bi bi-sun-fill"></i>');
    }
  }

  
//pomodoro timer
let timerInterval;
let timeLeft;
let isRunning = false;
let pomodoroCount = 0;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

const pomodoroDuration = 25 * 60; // 25 minutes in seconds
const shortBreakDuration = 5 * 60; // 5 minutes in seconds
const longBreakDuration = 15 * 60; // 15 minutes in seconds

function startTimer(duration) {
  let timer = duration;
  let minutes;
  let seconds;

  timerInterval = setInterval(function () {
    minutes = Math.floor(timer / 60);
    seconds = timer % 60;

    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    display.textContent = `${minutes}:${seconds}`;

    if (--timer < 0) {
      clearInterval(timerInterval);
      display.textContent = "00:00";
      isRunning = false;

      if (pomodoroCount % 2 === 0 && pomodoroCount < 6) {
        // Short Break (5 minutes)
        pomodoroCount++;
        timeLeft = shortBreakDuration;
        startTimer(timeLeft);
      } else if (pomodoroCount === 6) {
        // Long Break (15 minutes)
        pomodoroCount = 0;
        timeLeft = longBreakDuration;
        startTimer(timeLeft);
      } else {
        // Pomodoro (25 minutes)
        pomodoroCount++;
        timeLeft = pomodoroDuration;
        startTimer(timeLeft);
      }
    }
  }, 1000);
}

startBtn.addEventListener('click', function () {
  if (!isRunning) {
    isRunning = true;
    if (pomodoroCount === 0) {
      timeLeft = pomodoroDuration;
    }
    startTimer(timeLeft);
  }
});

pauseBtn.addEventListener('click', function () {
  clearInterval(timerInterval);
  isRunning = false;
});

resetBtn.addEventListener('click', function () {
  clearInterval(timerInterval);
  isRunning = false;
  pomodoroCount = 0;
  display.textContent = "25:00";
});
