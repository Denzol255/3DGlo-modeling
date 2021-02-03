"use strict";
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const income = "Инвестиции",
  mission = 90000,
  period = 6;

let money,
  addExpenses = prompt(
    "Перечислите возможные расходы за рассчитываемый период через запятую",
    "Драгоценности, одежда, бензин"
  ),
  deposit = confirm("Есть ли у вас депозит в банке?"),
  expenses = [],
  start = function () {
    do {
      money = prompt("Ваш месячный доход?");
    } while (!isNumber(money));
  };

start();

let showTypeOf = function (data) {
    console.log(data, typeof data);
  },
  getExpensesMonth = function () {
    let sum = 0,
      temp = 0;
    for (let i = 0; i < 2; i++) {
      expenses[i] = prompt("Введите обязательную статью расходов?");
      do {
        temp = prompt("Во сколько это обойдется?");
      } while (!isNumber(temp));
      sum += +temp;
    }
    console.log(expenses);
    return sum;
  },
  expensesAmount = getExpensesMonth(),
  getAccumulatedMonth = function () {
    return money - expensesAmount;
  },
  accumulatedMonth = getAccumulatedMonth(),
  getTargetMonth = function () {
    let target = Math.round(mission / accumulatedMonth);
    if (target > 0 && isFinite(target)) {
      console.log(`Цель будет достигнута за ${target} месяцев (-а)`);
    } else {
      console.log("Цель не будет достигнута");
    }
  },
  targetMonth = getTargetMonth(),
  budgetDay = Math.floor(accumulatedMonth / 30),
  getStatusIncome = function () {
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
  };

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log("Расходы за месяц: " + expensesAmount);
console.log(addExpenses.toLowerCase().split(", "));
console.log(`Бюджет на день: ${budgetDay}`);
getStatusIncome();
