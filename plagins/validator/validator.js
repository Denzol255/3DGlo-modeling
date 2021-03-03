/* eslint-disable arrow-parens */
/* eslint-disable arrow-body-style */
class Validator {
  constructor({ selector, pattern = {}, method }) {
    this.form = document.querySelector(selector);
    this.pattern = pattern;
    this.method = method;
    this.elementsForm = [...this.form.elements].filter((item) => {
      return (
        item.getAttribute("name") === "user_name" ||
        item.getAttribute("name") === "user_message" ||
        item.getAttribute("name") === "user_phone" ||
        item.getAttribute("name") === "user_email"
      );
    });
    this.error = new Set();
  }

  init() {
    this.applyStyle();
    this.setPattern();
    this.elementsForm.forEach((elem) =>
      elem.addEventListener("change", this.checkIt.bind(this))
    );
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.elementsForm.forEach((elem) => this.checkIt({ target: elem }));
      if (this.error.size) {
        e.preventDefault();
      }
    });
  }

  isValid(elem) {
    const validatorMethod = {
      notEmpty(elem) {
        if (elem.value.trim() === "") {
          return false;
        }
        return true;
      },
      pattern(elem, pattern) {
        return pattern.test(elem.value);
      },
    };

    if (this.method) {
      const method = this.method[elem.id.split("-")[1]];

      if (method) {
        return method.every((item) =>
          validatorMethod[item[0]](elem, this.pattern[item[1]])
        );
      }
    }
    return true;
  }

  checkIt(event) {
    const target = event.target;
    if (this.isValid(target)) {
      this.showSuccess(target);
      this.error.delete(target);
    } else {
      this.showError(target);
      this.error.add(target);
    }
  }

  showError(elem) {
    elem.classList.remove("success");
    elem.classList.add("error");
    if (
      elem.nextElementSibling &&
      elem.nextElementSibling.classList.contains("validator-error")
    ) {
      return;
    }
    const errorDiv = document.createElement("div");
    errorDiv.textContent = "Ошибка в этом поле";
    errorDiv.classList.add("validator-error");
    elem.insertAdjacentElement("afterend", errorDiv);
  }

  showSuccess(elem) {
    elem.classList.remove("error");
    elem.classList.add("success");
    if (
      elem.nextElementSibling &&
      elem.nextElementSibling.classList.contains("validator-error")
    ) {
      elem.nextElementSibling.remove();
    }
  }

  applyStyle() {
    const style = document.createElement("style");
    style.textContent = `
			input.success{
				border: 3px solid green !important;
			}
			input.error{
				border: 3px solid red !important;
			}
			.validator-error{
				font-size: 12px;
				color:red;
				
			}
			`;
    document.head.append(style);
  }

  setPattern() {
    if (!this.pattern.name) {
      this.pattern.name = /[-а-яё\s]/gi;
    }
    if (!this.pattern.message) {
      this.pattern.message = /[-а-яё\s]/gi;
    }
    if (!this.pattern.phone) {
      this.pattern.phone = /[\d()-]/gi;
    }
    if (!this.pattern.email) {
      this.pattern.email = /[a-z@_.!~*'-]/gi;
    }
  }
}
