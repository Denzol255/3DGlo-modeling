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
      do {
        appData.expenses[key] = prompt("Во сколько это обойдется?");
      } while (!isNumber(appData.expenses[key]));
      appData.expenses[key] = Number(appData.expenses[key]);
    }
    console.log(appData.expenses);
  },
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  //Метод возвращает все расходы
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
    return appData.expensesMonth;
  },

  //Метод возвращает доходы за месяц (Доходы минус расходы) + бюджет на день
  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },

  getTargetMonth: function () {
    let target = Math.round(appData.mission / appData.budgetMonth);
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
appData.getExpensesMonth();
appData.getBudget();
console.log("Расходы за месяц: " + appData.expensesMonth);
appData.getTargetMonth();
appData.getStatusIncome();

for (let key in appData) {
  console.log(
    "Наша программа включает в себя данные: " +
      "Ключ: " +
      key +
      " Значение: " +
      appData[key]
  );
}
