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

export default toggleMenu;
