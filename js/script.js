"use strict";
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;

const start = function () {
  do {
    money = prompt("Ваш месячный доход?");
  } while (!isNumber(money));
};
start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 90000,
  period: 6,
  asking: function () {
    let addExpenses = prompt(
      "Перечислите возможные расходы за рассчитываемый период через запятую",
      "Драгоценности, одежда, бензин"
    );
    appData.addExpenses = addExpenses.toLowerCase().split(", ");
    appData.deposit = confirm("Есть ли у вас депозит в банке?");
    for (let i = 0; i < 2; i++) {
      let key = prompt("Введите обязательную статью расходов?");
      appData.expenses[key] = Number(prompt("Во сколько это обойдется?")); // Добавить проверку на число!
    }
    console.log(appData.expenses);
  },
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  getExpensesMonth: function () {
    let sum = 0;
    for (let key in appData.expenses) {
      sum += appData.expenses[key];
    }
    return sum;
  },
  getAccumulatedMonth: function (cash, exps) {
    return cash - exps;
  },
  getTargetMonth: function (mis, acc) {
    let target = Math.round(mis / acc);
    if (target > 0 && isFinite(target)) {
      console.log(`Цель будет достигнута за ${target} месяцев (-а)`);
    } else {
      console.log("Цель не будет достигнута");
    }
  },
  getStatusIncome: function () {
    if (appData.budgetDay >= 1200) {
      console.log("У вас высокий уровень дохода");
    } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
      console.log("У вас средний уровень дохода");
    } else if (appData.budgetDay < 600 && appData.budgetDay > 0) {
      console.log("У вас низкий уровень дохода");
    } else if (appData.budgetDay === 0) {
      console.log("У вас нет доходов");
    } else {
      console.log("Что-то пошло не так");
    }
  },
};

appData.asking();

let expensesAmount = appData.getExpensesMonth(),
  accumulatedMonth = appData.getAccumulatedMonth(money, expensesAmount),
  targetMonth = appData.getTargetMonth(appData.mission, accumulatedMonth);

console.log("Расходы за месяц: " + expensesAmount);
console.log(`Бюджет на день: ${appData.budgetDay}`);
appData.getStatusIncome();

// Math.floor(appData.getAccumulatedMonth / 30);
