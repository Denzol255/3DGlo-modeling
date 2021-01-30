"use strict";

const money = 900,
  income = "investments",
  addExpenses = "Internet, Taxi, Shopping",
  deposit = true,
  mission = 90000,
  period = 6,
  budgetDay = money / 30;

alert("Hello world!");

console.log("Hello, friends!");

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} долларов`);
console.log(addExpenses.toLowerCase().split(", "));
console.log(budgetDay);
