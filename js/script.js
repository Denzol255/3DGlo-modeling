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
      target = target.matches("menu a");
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

  //Slider

  const slider = () => {
    const slider = document.querySelector(".portfolio-content"),
      slide = document.querySelectorAll(".portfolio-item"),
      sliderBtn = document.querySelectorAll(".portfolio-btn");
    let currentSlide = 0,
      interval,
      dot;

    for (let i = 0; i < slide.length; i++) {
      dot = document.createElement("li");
      dot.classList.add("dot");
      if (i === 0) {
        dot.classList.add("dot-active");
      }
      document.querySelector(".portfolio-dots").append(dot);
    }

    const sliderDot = document.querySelectorAll(".dot");

    const slideNext = (elem, index, strSlide) => {
      elem[index].classList.add(strSlide);
    };

    const slidePrev = (elem, index, strSlide) => {
      elem[index].classList.remove(strSlide);
    };

    const autoPlay = () => {
      slidePrev(slide, currentSlide, "portfolio-item-active");
      slidePrev(sliderDot, currentSlide, "dot-active");
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      slideNext(slide, currentSlide, "portfolio-item-active");
      slideNext(sliderDot, currentSlide, "dot-active");
    };

    const startSlide = (time = 2000) => {
      interval = setInterval(autoPlay, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };
    slider.addEventListener("click", (event) => {
      event.preventDefault();
      const target = event.target;
      if (!target.matches(".portfolio-btn, .dot")) {
        return;
      }

      slidePrev(slide, currentSlide, "portfolio-item-active");
      slidePrev(sliderDot, currentSlide, "dot-active");

      if (target.matches("#arrow-right")) {
        currentSlide++;
      } else if (target.matches("#arrow-left")) {
        currentSlide--;
      } else if (target.matches(".dot")) {
        sliderDot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      slideNext(slide, currentSlide, "portfolio-item-active");
      slideNext(sliderDot, currentSlide, "dot-active");
    });

    slider.addEventListener("mouseover", (event) => {
      if (
        event.target.matches(".portfolio-btn") ||
        event.target.matches(".dot")
      ) {
        stopSlide();
      }
    });
    slider.addEventListener("mouseout", (event) => {
      if (
        event.target.matches(".portfolio-btn") ||
        event.target.matches(".dot")
      ) {
        startSlide();
      }
    });

    startSlide(2000);
  };

  slider();

  // Change photo on hover

  const photoChange = () => {
    const commandPhoto = document.querySelectorAll(".command__photo");
    commandPhoto.forEach((item) => {
      let oldSrcPhoto;
      item.addEventListener("mouseenter", (e) => {
        oldSrcPhoto = e.target.src;
        e.target.src = e.target.dataset.img;
      });
      item.addEventListener("mouseleave", (e) => {
        e.target.src = oldSrcPhoto;
      });
    });
  };

  photoChange();

  // Regulars for values

  const checkValue = () => {
    const deleteSpaceDash = (item) => {
      item.value = item.value.replace(/-+/g, "-");
      item.value = item.value.replace(/\s+/g, " ");
      item.value = item.value.replace(/^-+/g, "");
      item.value = item.value.replace(/-+$/g, "");
    };
    const replaceReg = (item, reg) => {
      item.value = item.value.replace(reg, "").trim();
      deleteSpaceDash(item);
    };
    document.addEventListener(
      "blur",
      (event) => {
        const target = event.target;
        if (target.matches("[name = 'user_name']")) {
          replaceReg(target, /[^-а-яё\s]/gi);
          let massiveOfNames = target.value.split(" ");
          for (let i = 0; i < massiveOfNames.length; i++) {
            massiveOfNames[i] =
              massiveOfNames[i].slice(0, 1).toUpperCase() +
              massiveOfNames[i].slice(1).toLowerCase();
          }
          massiveOfNames = massiveOfNames.join(" ");
          target.value = massiveOfNames;
        } else if (target.matches("[name = 'user_message']")) {
          replaceReg(target, /[^-а-яё\s]/gi);
        } else if (target.matches("[name = 'user_email']")) {
          replaceReg(target, /[^a-z@_.!~*'-]/gi);
        } else if (target.matches("[name = 'user_phone']")) {
          replaceReg(target, /[^\d()-]/gi);
        } else if (target.matches(".calc-item")) {
          target.value = target.value.replace(/\D/g, "");
        }
      },
      true
    );
  };

  checkValue();

  // Calculator

  const calc = (price = 100) => {
    const calcBlock = document.querySelector(".calc-block"),
      calcType = document.querySelector(".calc-type"),
      calcSquare = document.querySelector(".calc-square"),
      calcCount = document.querySelector(".calc-count"),
      calcDay = document.querySelector(".calc-day"),
      totalValue = document.getElementById("total");

    const countSum = () => {
      let total = 0,
        countValue = 1,
        dayValue = 1;
      const typeValue = calcType.options[calcType.selectedIndex].value,
        squareValue = +calcSquare.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }

      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
      }

      totalValue.textContent = total;
    };

    calcBlock.addEventListener("change", (event) => {
      const target = event.target;
      if (
        target.matches(".calc-type") ||
        target.matches(".calc-square") ||
        target.matches(".calc-count") ||
        target.matches(".calc-day")
      ) {
        countSum();
      }
    });
  };

  calc(100);
});
