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

export default slider;
