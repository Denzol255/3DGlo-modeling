"use strict";
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let isString = function (value) {
  return isNaN(value);
};

let money;

const start = function () {
  do {
    money = prompt("Ваш месячный доход?", 50000);
  } while (!isNumber(money));
};
// start();

const calcBtn = document.getElementById("start"),
  firstPlusBtn = document.getElementsByTagName("button")[0],
  secondPlusBtn = document.getElementsByTagName("button")[1],
  depositCheckbox = document.querySelector("#deposit-check"),
  addIncomeField = document.querySelectorAll(".additional_income-item"),
  budgetMonthValue = document.getElementsByClassName("budget_month-value")[0],
  budgetDayValue = document.getElementsByClassName("budget_day-value")[0],
  expensesMonthValue = document.getElementsByClassName(
    "expenses_month-value"
  )[0],
  addIncomeValue = document.getElementsByClassName(
    "additional_income-value"
  )[0],
  addExpensesValue = document.getElementsByClassName(
    "additional_expenses-value"
  )[0],
  incomePeriodValue = document.getElementsByClassName("income_period-value")[0],
  targetMonthValue = document.getElementsByClassName("target_month-value")[0],
  salaryAmount = document.querySelector(".salary-amount"),
  incomeTitle = document.querySelectorAll(".income-title")[1],
  incomeAmount = document.querySelector(".income-amount"),
  expensesTitle = document.querySelectorAll(".expenses-title")[1],
  expensesAmount = document.querySelector(".expenses-amount"),
  addExpensesField = document.querySelector(".additional_expenses-item"),
  targetAmount = document.querySelector(".target-amount"),
  periodRange = document.querySelector(".period-select");

console.log(salaryAmount);
console.log(incomeTitle);
console.log(incomeAmount);
console.log(firstPlusBtn);
console.log(addIncomeField);
console.log(expensesTitle);
console.log(expensesAmount);
console.log(secondPlusBtn);
console.log(addExpensesField);
console.log(depositCheckbox);
console.log(targetAmount);
console.log(periodRange);
console.log(budgetMonthValue);
console.log(budgetDayValue);
console.log(expensesMonthValue);
console.log(addIncomeValue);
console.log(addExpensesValue);
console.log(incomePeriodValue);
console.log(targetMonthValue);
console.log(calcBtn);

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 90000,
  period: 6,
  asking: function () {
    if (confirm("Есть ли у вас дополнительный источник заработка?")) {
      let itemIncome, cashIncome;
      do {
        itemIncome = prompt(
          "Какой у вас дополнительный источник дохода?",
          "Инвестиции"
        );
      } while (!isString(itemIncome));
      do {
        cashIncome = prompt("Сколько в месяц вы зарабатываете на этом?", 10000);
      } while (!isNumber(cashIncome));
      appData.income[itemIncome] = cashIncome;
    }

    do {
      appData.addExpenses = prompt(
        "Перечислите возможные расходы за рассчитываемый период через запятую",
        "     Интернет , комуналка ,такси,аптека, детский сад "
      );
    } while (!isString(appData.addExpenses));
    appData.addExpenses = appData.addExpenses.trim();
    appData.addExpenses = appData.addExpenses.toLowerCase().split(",");
    appData.deposit = confirm("Есть ли у вас депозит в банке?");
    for (let i = 0; i < 2; i++) {
      let key;
      do {
        key = prompt("Введите обязательную статью расходов?");
      } while (!isString(key));
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
  /* Метод убирает у каждого элемента массива пробелы в начале и конце, вырезает первый символ, делает его заглавным и 
  соединяет с тем же элементом без первого символа и без пробелов в начале и конце
  */
  getExpenses: function () {
    appData.addExpenses = appData.addExpenses.map(
      (item) => item.trim().slice(0, 1).toUpperCase() + item.trim().slice(1)
    );
    console.log(appData.addExpenses.join(", "));
  },
  // Метод возвращает все расходы
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
    return appData.expensesMonth;
  },

  // Метод возвращает доходы за месяц (Доходы минус расходы) + бюджет на день
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
  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt("Какой годовой процент?", 10);
      } while (!isNumber(appData.percentDeposit));
      do {
        appData.moneyDeposit = prompt("Какая сумма заложена?", 10000);
      } while (!isNumber(appData.moneyDeposit));
    }
  },
  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period;
  },
};

// appData.asking();
// appData.getExpenses();
// appData.getExpensesMonth();
// appData.getBudget();
// console.log("Расходы за месяц: " + appData.expensesMonth);
// appData.getTargetMonth();
// appData.getStatusIncome();
// appData.getInfoDeposit();
// console.log(appData.calcSavedMoney());

// for (let key in appData) {
//   console.log(
//     "Наша программа включает в себя данные: " +
//       "Ключ: " +
//       key +
//       " Значение: " +
//       appData[key]
//   );
// }
