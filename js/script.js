"use strict";

const books = document.querySelector(".books"),
  ads = document.querySelector(".adv"),
  book = document.querySelectorAll(".book"),
  headBook = book[4].querySelector("h2"),
  chapterListOfBook2 = book[0].querySelector("ul"),
  chaptersOfBook2 = chapterListOfBook2.querySelectorAll("li"),
  chapterListOfBook5 = book[5].querySelector("ul"),
  chaptersOfBook5 = chapterListOfBook5.querySelectorAll("li"),
  chapterListOfBook6 = book[2].querySelector("ul"),
  chaptersOfBook6 = chapterListOfBook6.querySelectorAll("li"),
  newChapter = document.createElement("li");

books.prepend(book[1]);
books.append(book[2]);
book[3].before(book[4]);

document.body.style.backgroundImage = "url(./image/you-dont-know-js.jpg)";

headBook.textContent = "Книга 3. this и Прототипы Объектов";
headBook.style.color = "darkkhaki";

ads.remove();

chaptersOfBook2[1].after(chaptersOfBook2[3]);
chaptersOfBook2[3].after(chaptersOfBook2[6]);
chaptersOfBook2[6].after(chaptersOfBook2[8]);
chaptersOfBook2[8].after(chaptersOfBook2[4]);
chaptersOfBook2[9].after(chaptersOfBook2[2]);

chaptersOfBook5[1].insertAdjacentElement("afterend", chaptersOfBook5[9]);
chaptersOfBook5[4].insertAdjacentElement("afterend", chaptersOfBook5[2]);
chaptersOfBook5[8].insertAdjacentElement("beforebegin", chaptersOfBook5[5]);

newChapter.textContent = "Глава 8: За пределами ES6";
chapterListOfBook6.append(newChapter);
chapterListOfBook6.append(chaptersOfBook6[9]);
