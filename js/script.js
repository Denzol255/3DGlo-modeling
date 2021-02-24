/* eslint-disable arrow-parens */
/* eslint-disable space-before-function-paren */
/* eslint-disable strict */
/* eslint-disable no-unused-vars */
/*tslint:disabled*/
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
        document.querySelector(".timer-numbers").classList.remove("d-none");
      } else {
        clearInterval(updateClock);
        timerSeconds.textContent = "00";
        timerMinutes.textContent = "00";
        timerHours.textContent = "00";
        document.querySelector(".timer-numbers").classList.remove("d-none");
      }
    }, 1000);
  }

  countTimer("25 feb 2021");

  //Menu
  const toggleMenu = () => {
    const menuBtn = document.querySelector(".menu"),
      menu = document.querySelector("menu");

    const handlerMenu = () => menu.classList.toggle("active-menu");
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      handlerMenu();
    });

    document.addEventListener("click", (event) => {
      let target = event.target;
      const itsMenu = target === menu || menu.contains(target);
      const itsBtnMenu = target === menuBtn;
      const menuIsActive = menu.classList.contains("active-menu");

      if (!itsMenu && !itsBtnMenu && menuIsActive) {
        handlerMenu();
      }
      target = target.matches("a");
      if (target) {
        handlerMenu();
      }
    });
  };

  toggleMenu();
  //Popup
  const togglePopup = () => {
    const popupBtn = document.querySelectorAll(".popup-btn"),
      popup = document.querySelector(".popup"),
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
        if (window.innerWidth > 768) {
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
          document.querySelector("body").classList.add("scroll--lock");
        } else {
          popup.style.display = "block";
          document.querySelector("body").classList.add("scroll--lock");
        }
      });
    });

    popup.addEventListener("click", (event) => {
      let target = event.target;

      if (target.classList.contains("popup-close")) {
        popup.style.display = "none";
        document.querySelector("body").classList.remove("scroll--lock");
      } else {
        target = target.closest(".popup-content");
        if (!target) {
          popup.style.display = "none";
          document.querySelector("body").classList.remove("scroll--lock");
        }
      }
    });
  };

  togglePopup();

  //Tabs
  const tabs = () => {
    const tabHeader = document.querySelector(".service-header"),
      tab = tabHeader.querySelectorAll(".service-header-tab"),
      tabContent = document.querySelectorAll(".service-tab");

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add("active");
          tabContent[i].classList.remove("d-none");
        } else {
          tab[i].classList.remove("active");
          tabContent[i].classList.add("d-none");
        }
      }
    };

    tabHeader.addEventListener("click", (event) => {
      let target = event.target;
      target = target.closest(".service-header-tab");

      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };

  tabs();
});
