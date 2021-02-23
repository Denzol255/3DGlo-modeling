/* eslint-disable arrow-parens */
/* eslint-disable space-before-function-paren */
/* eslint-disable strict */
/* eslint-disable no-unused-vars */
window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  //Timer
  function countTimer(deadline) {
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
      } else {
        clearInterval(updateClock);
        timerSeconds.textContent = "00";
        timerMinutes.textContent = "00";
        timerHours.textContent = "00";
      }
    }, 1000);
  }

  countTimer("24 feb 2021");

  //Menu
  const toggleMenu = () => {
    const menuBtn = document.querySelector(".menu"),
      menu = document.querySelector("menu"),
      menuCloseBtn = document.querySelector(".close-btn"),
      menuItems = menu.querySelectorAll("ul > li");

    const handlerMenu = () => menu.classList.toggle("active-menu");
    menuBtn.addEventListener("click", handlerMenu);
    menuCloseBtn.addEventListener("click", handlerMenu);
    menuItems.forEach((item) => item.addEventListener("click", handlerMenu));
  };

  toggleMenu();

  //Popup
  const togglePopup = () => {
    const popupBtn = document.querySelectorAll(".popup-btn"),
      popup = document.querySelector(".popup"),
      popupCloseBtn = popup.querySelector(".popup-close"),
      popupContent = popup.querySelector(".popup-content");
    let animationInterval;
    const start = Date.now(),
      draw = (timePassed) => {
        popupContent.style.left = timePassed / 5 + "px";
      },
      popupAnimation = () => {
        animationInterval = requestAnimationFrame(popupAnimation);
        const timerAnimation = setInterval(() => {
          const timePassed = Date.now() - start;

          if (timePassed >= 5000) {
            clearInterval(timerAnimation);
            return;
          }

          draw(timePassed);
        }, 10);
      };

    popupBtn.forEach((item) => {
      item.addEventListener("click", () => {
        popup.style.display = "block";

        popupAnimation();
      });
    });

    popupCloseBtn.addEventListener(
      "click",
      () => (popup.style.display = "none")
    );
  };

  togglePopup();
});
