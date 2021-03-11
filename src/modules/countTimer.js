const countTimer = (deadline) => {
  const timerHours = document.querySelector("#timer-hours"),
    timerMinutes = document.querySelector("#timer-minutes"),
    timerSeconds = document.querySelector("#timer-seconds");
  function getTimeRemaining() {
    const dateStop = new Date(deadline).getTime(),
      dateNow = new Date().getTime(),
      timeRemaining = (dateStop - dateNow) / 1000,
      seconds = Math.floor(timeRemaining % 60),
      minutes = Math.floor((timeRemaining / 60) % 60),
      hours = Math.floor(timeRemaining / 60 / 60);
    return {
      timeRemaining,
      hours,
      minutes,
      seconds,
    };
  }
  const getZero = function (num) {
    if (num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  };

  const updateClock = setInterval(() => {
    const timer = getTimeRemaining();
    if (timer.timeRemaining > 0) {
      timerHours.textContent = getZero(timer.hours);
      timerMinutes.textContent = getZero(timer.minutes);
      timerSeconds.textContent = getZero(timer.seconds);
      document.querySelector(".timer-numbers").classList.remove("d-none");
    } else {
      clearInterval(updateClock);
      timerSeconds.textContent = "00";
      timerMinutes.textContent = "00";
      timerHours.textContent = "00";
      document.querySelector(".timer-numbers").classList.remove("d-none");
    }
  }, 1000);
};

export default countTimer;
