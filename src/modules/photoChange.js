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

export default photoChange;
