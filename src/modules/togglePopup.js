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

export default togglePopup;
