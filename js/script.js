"use strict";
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let isString = function (value) {
  return isNaN(value);
};

const start = document.getElementById("start"),
  firstPlusBtn = document.getElementsByTagName("button")[0],
  secondPlusBtn = document.getElementsByTagName("button")[1],
  depositCheckbox = document.querySelector("#deposit-check"),
  addIncomeItem = document.querySelectorAll(".additional_income-item"),
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
  incomeTitle = document.querySelector(".income-title"),
  expensesTitle = document.querySelector(".expenses-title"),
  addExpensesField = document.querySelector(".additional_expenses-item"),
  targetAmount = document.querySelector(".target-amount"),
  periodRange = document.querySelector(".period-select");

let expensesItems = document.querySelectorAll(".expenses-items"),
  incomeItems = document.querySelectorAll(".income-items");

// console.log(salaryAmount);
// console.log(incomeTitle);
// console.log(incomeAmount);
// console.log(firstPlusBtn);
// console.log(addIncomeField);
// console.log(expensesTitle);
// console.log(expensesAmount);
// console.log(secondPlusBtn);
// console.log(addExpensesField);
// console.log(depositCheckbox);
// console.log(targetAmount);
// console.log(periodRange);
// console.log(budgetMonthValue);
// console.log(budgetDayValue);
// console.log(expensesMonthValue);
// console.log(addIncomeValue);
// console.log(addExpensesValue);
// console.log(incomePeriodValue);
// console.log(targetMonthValue);
// console.log(calcBtn);

let appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  incomeMonth: 0,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  start: function () {
    if (salaryAmount.value === "") {
      alert("Ошибка");
      return;
    }
    appData.budget = +salaryAmount.value;

    appData.getExpenses();
    appData.getExpensesMonth();
    appData.getBudget();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getIncome();
    appData.showResult();
  },
  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    addExpensesValue.value = appData.addExpenses.join(", ");
    addIncomeValue.value = appData.addIncome.join(", ");
    targetMonthValue.value = appData.getTargetMonth();
    incomePeriodValue.value = appData.calcSavedMoney();
  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, secondPlusBtn);
    expensesItems = document.querySelectorAll(".expenses-items");
    if (expensesItems.length === 3) {
      secondPlusBtn.style.display = "none";
    }
  },
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector(".expenses-title").value;
      let cashExpenses = item.querySelector(".expenses-amount").value;
      if (itemExpenses !== "" && cashExpenses !== "") {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  getIncome: function () {
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector(".income-title").value;
      let cashIncome = item.querySelector(".income-amount").value;
      if (itemIncome !== "" && cashIncome !== "") {
        appData.income[itemIncome] = cashIncome;
      }
    });
  },
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, firstPlusBtn);
    incomeItems = document.querySelectorAll(".income-items");
    if (incomeItems.length === 3) {
      firstPlusBtn.style.display = "none";
    }
  },
  getAddExpenses: function () {
    let addExpenses = addExpensesField.value.split(",");
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== "") {
        item = item.trim().slice(0, 1).toUpperCase() + item.trim().slice(1);
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function () {
    addIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== "") {
        appData.addIncome.push(itemValue);
      }
    });
  },
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
  },
  /* Метод убирает у каждого элемента массива пробелы в начале и конце, вырезает первый символ, делает его заглавным и 
  соединяет с тем же элементом без первого символа и без пробелов в начале и конце
  */
  // getExpenses: function () {
  //   appData.addExpenses = appData.addExpenses.map(
  //     (item) => item.trim().slice(0, 1).toUpperCase() + item.trim().slice(1)
  //   );
  //   console.log(appData.addExpenses.join(", "));
  // },
  // Метод возвращает все расходы

  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
    return appData.expensesMonth;
  },
  getIncomeMonth: function () {
    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
    return appData.incomeMonth;
  },

  // Метод возвращает доходы за месяц + бюджет на день
  getBudget: function () {
    appData.budgetMonth =
      appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },

  getTargetMonth: function () {
    return Math.ceil(targetAmount.value / appData.budgetMonth);
    // if (target > 0 && isFinite(target)) {
    //   console.log(`Цель будет достигнута за ${target} месяцев (-а)`);
    // } else {
    //   console.log("Цель не будет достигнута");
    // }
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
    return appData.budgetMonth * periodRange.value;
  },
};

start.addEventListener("click", appData.start);

secondPlusBtn.addEventListener("click", appData.addExpensesBlock);

firstPlusBtn.addEventListener("click", appData.addIncomeBlock);

periodRange.addEventListener("change", function (e) {
  let periodAmount = document.querySelector(".period-amount");
  periodAmount.textContent = e.target.value;
});

console.log(appData.expensesMonth);

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
