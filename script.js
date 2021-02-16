"use strict";

function DomElement(selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
}

DomElement.prototype.createEl = function () {
  if (this.selector[0] === ".") {
    let newDiv = document.createElement("div");
    newDiv.classList.add(this.selector);
    newDiv.textContent = "Div";
    newDiv.style.cssText = `height: ${this.height}px; 
            width: ${this.width}px; 
            background-color: #${this.bg}; 
            font-size: ${this.fontSize}px;`;
    document.body.appendChild(newDiv);
  } else if (this.selector[0] === "#") {
    let newP = document.createElement("p");
    newP.classList.add(this.selector);
    newP.textContent = "Параграф";
    newP.style.cssText = `height: ${this.height}px; 
            width: ${this.width}px; 
            background-color: #${this.bg}; 
            font-size: ${this.fontSize}px;`;
    document.body.appendChild(newP);
  }
};

let newELement = new DomElement("#block", 100, 200, "FF0000", 32);

newELement.createEl();
