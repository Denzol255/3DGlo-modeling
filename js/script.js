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
    function animate({ timing, draw, duration }) {
      const start = performance.now();

      requestAnimationFrame(function animate(time) {
        // timeFraction изменяется от 0 до 1
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) {
          timeFraction = 1;
        }

        // вычисление текущего состояния анимации
        const progress = timing(timeFraction);

        draw(progress); // отрисовать её

        if (timeFraction < 1) {
          requestAnimationFrame(animate);
        }
      });
    }
    popupBtn.forEach((item) => {
      item.addEventListener("click", () => {
        if (document.documentElement.clientWidth > 768) {
          popup.style.display = "block";
          animate({
            duration: 1000,
            timing(timeFraction) {
              return Math.pow(timeFraction, 3);
            },
            draw(progress) {
              popupContent.style.left =
                progress *
                  (document.documentElement.clientWidth / 2 -
                    popupContent.offsetWidth / 2 +
                    50) +
                "px";
            },
          });
        } else {
          popup.style.display = "block";
        }
      });
    });

    popupCloseBtn.addEventListener(
      "click",
      () => (popup.style.display = "none")
    );
  };

  togglePopup();
});
