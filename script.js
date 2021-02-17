"use strict";

function DomElement(
  selector = ".block",
  height = 100,
  width = 200,
  bg = "FA8E47",
  fontSize = 14
) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
}

DomElement.prototype.createEl = function () {
  let block;
  if (this.selector[0] === ".") {
    block = document.createElement("div");
    block.classList.add(this.selector.slice(1));
    block.textContent = "Div";
  } else if (this.selector[0] === "#") {
    block = document.createElement("p");
    block.setAttribute("id", this.selector.slice(1));
    block.textContent = "Параграф";
  }
  block.style.cssText = `height: ${this.height}px; 
  width: ${this.width}px; 
  background-color: #${this.bg}; 
  font-size: ${this.fontSize}px`;
  document.body.append(block);
};

let newELement = new DomElement("#new", 300, 400, "FF0000", 32);

newELement.createEl();
