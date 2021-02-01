"use strict";

let money = 900,
  addExpenses = "Интернет, такси, одежда",
  deposit = true,
  budgetDay = money / 30;
const income = "Инвестиции",
  mission = 90000,
  period = 6;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} долларов`);
console.log(addExpenses.toLowerCase().split(", "));
console.log(budgetDay);

money = prompt("Ваш месячный доход?");

addExpenses = prompt(
  "Перечислите возможные расходы за рассчитываемый период через запятую"
);

deposit = confirm("Есть ли у вас депозит в банке?");

let expenses1 = prompt("Введите обязательную статью расходов?"),
  amount1 = prompt("Во сколько это обойдется?"),
  expenses2 = prompt("Введите обязательную статью расходов?"),
  amount2 = prompt("Во сколько это обойдется?"),
  budgetMonth = money - amount1 - amount2,
  monthsForMisson = Math.round(mission / budgetMonth);

budgetDay = Math.floor(budgetMonth / 30);
console.log("Бюджет на месяц:", budgetMonth, "долларов");
console.log(`Цель будет достигнута за ${monthsForMisson} месяцев (-а)`);
console.log(`Бюджет на день: ${budgetDay}`);

if (budgetDay >= 1200) {
  console.log("У вас высокий уровень дохода");
} else if (budgetDay >= 600 && budgetDay < 1200) {
  console.log("У вас средний уровень дохода");
} else if (budgetDay < 600 && budgetDay > 0) {
  console.log("У вас низкий уровень дохода");
} else if (budgetDay === 0) {
  console.log("У вас нет доходов");
} else {
  console.log("Что-то пошло не так");
}
