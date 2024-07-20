document.getElementById('start-timer').addEventListener('click', startNewTimer);

let timers = [];


function startNewTimer() {
  const hours = parseInt(document.getElementById('hours').value) || 0;
  const minutes = parseInt(document.getElementById('minutes').value) || 0;
  const seconds = parseInt(document.getElementById('seconds').value) || 0;

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  if (totalSeconds > 0) {
    const timer = {
      id: Date.now(),
      remainingTime: totalSeconds,
      interval: null,
    };
    timers.push(timer);
    displayTimer(timer);
    startCountdown(timer);
  }
}

function startCountdown(timer) {
  timer.interval = setInterval(() => {
    timer.remainingTime--;
    updateTimerDisplay(timer);
    if (timer.remainingTime <= 0) {
      clearInterval(timer.interval);
      timerEnded(timer);
    }
  }, 1000);
}

function displayTimer(timer) {
  const timerElement = document.createElement('div');
  timerElement.className = 'timer';
  timerElement.id = `timer-${timer.id}`;
  timerElement.innerHTML = `
    <h5 style="color: white;">Time Left: </h5> 
    <span>${formatTime(timer.remainingTime)}</span>
    <button onclick="stopTimer(${timer.id})">Delete</button>
  `;
  document.getElementById('active-timers').appendChild(timerElement);
}

function updateTimerDisplay(timer) {
  const timerElement = document.getElementById(`timer-${timer.id}`);
  timerElement.querySelector('span').textContent = formatTime(timer.remainingTime);
}

function stopTimer(id) {
  const timer = timers.find(t => t.id === id);
  clearInterval(timer.interval);
  document.getElementById(`timer-${id}`).remove();
  timers = timers.filter(t => t.id !== id);
}

function timerEnded(timer) {
  const timerElement = document.getElementById(`timer-${timer.id}`);
  timerElement.className += ' timer-ended';
  timerElement.innerHTML=`
  <h1 style="color: black;">Time is Up!<h1>
  <button onclick="stopTimer(${timer.id})" style="background-color: #34344A;
    border-radius: 26px;
    width:100%;
    border: 0;
    padding: 10px 20px 10px;
    color: white;
    font-family: Roboto;
    font-weight: 500;
    text-align: center;
    height: 40px;">Delete</button>
  `
  document.getElementById('timer-sound').play();
}

function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
