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
  const body = document.querySelector("body");
  body.addEventListener(
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
        replaceReg(target, /[^а-яё\s\d.,;:'"!?()-/]/gi);
      } else if (target.matches("[name = 'user_email']")) {
        replaceReg(target, /[^a-z@_.!~*'-]/gi);
      } else if (target.matches("[name = 'user_phone']")) {
        replaceReg(target, /[^\d+]/gi);
      } else if (
        target.matches(".calc-square") ||
        target.matches(".calc-count") ||
        target.matches(".calc-day")
      ) {
        target.value = target.value.replace(/\D/g, "");
      }
    },
    true
  );
};

export default checkValue;
