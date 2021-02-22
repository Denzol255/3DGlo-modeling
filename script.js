"use strict";

const date = new Date(),
  hours = date.getHours(),
  americanTime = date.toLocaleTimeString("en-US", {
    hour12: true,
  }),
  numberOfDay = date.getDay(),
  newYearDate = new Date("January 1, 2022");

const helloLine = document.createElement("p"),
  weekDayLine = document.createElement("p"),
  currentTimeLine = document.createElement("p"),
  newYearLine = document.createElement("p");

const days = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];

const checkTimeOfDay = function (hour) {
  let name;
  if (hour > 0 && hour < 5) {
    name = "Доброй ночи!";
  } else if (hour > 5 && hour < 12) {
    name = "Доброе утро!";
  } else if (hour > 12 && hour < 18) {
    name = "Добрый день!";
  } else {
    name = "Добрый вечер!";
  }
  return name;
};

const leftDaysUntilNewYear = function () {
  const msPerDay = 24 * 60 * 60 * 1000;
  let daysLeft = Math.round(
    (newYearDate.getTime() - date.getTime()) / msPerDay
  );
  console.log();
  let dayname = "",
    dayString = "" + daysLeft,
    lastNum = parseInt(dayString.substr(dayString.length - 1));
  if (daysLeft > 4 && daysLeft < 21) {
    dayname = " дней";
  } else if (
    Number(daysLeft.toString().slice(1)) > 4 &&
    Number(daysLeft.toString().slice(1)) < 21
  ) {
    dayname = " дней";
  } else if (lastNum === 1) {
    dayname = " день";
  } else if (lastNum === 2 || lastNum === 3 || lastNum === 4) {
    dayname = " дня";
  } else {
    dayname = " дней";
  }
  if (daysLeft < 0) {
    newYearLine.textContent = "С новым годом!!!";
  } else {
    if (daysLeft === 0) {
      newYearLine.textContent = "Завтра новый год!";
    } else {
      newYearLine.textContent =
        "До нового года осталось " + daysLeft + dayname + "!";
    }
  }
};

leftDaysUntilNewYear();

helloLine.textContent = checkTimeOfDay(date.getHours());

weekDayLine.textContent = "Сегодня: " + days[numberOfDay];

currentTimeLine.textContent = "Текущее время: " + americanTime;

document.body.appendChild(helloLine);
document.body.appendChild(weekDayLine);
document.body.appendChild(currentTimeLine);
document.body.appendChild(newYearLine);
