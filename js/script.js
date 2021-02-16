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
  incomeAmount = document.querySelector(".income-amount"),
  expensesTitle = document.querySelector(".expenses-title"),
  expensesAmount = document.querySelector(".expenses-amount"),
  addExpensesField = document.querySelector(".additional_expenses-item"),
  targetAmount = document.querySelector(".target-amount"),
  periodRange = document.querySelector(".period-select"),
  cancel = document.getElementById("cancel");

let expensesItems = document.querySelectorAll(".expenses-items"),
  incomeItems = document.querySelectorAll(".income-items");

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
    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getIncomeMonth();
    this.getBudget();
    this.showResult();
  },
  showResult: function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    addExpensesValue.value = this.addExpenses.join(", ");
    addIncomeValue.value = this.addIncome.join(", ");
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();

    periodRange.addEventListener("input", function (e) {
      incomePeriodValue.value = this.budgetMonth * e.target.value;
    });
  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.children[0].value = "";
    cloneExpensesItem.children[1].value = "";
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, secondPlusBtn);
    expensesItems = document.querySelectorAll(".expenses-items");
    if (expensesItems.length === 3) {
      secondPlusBtn.style.display = "none";
    }
  },
  getExpenses: function () {
    expensesItems.forEach((item) => {
      let itemExpenses = item.querySelector(".expenses-title").value;
      let cashExpenses = item.querySelector(".expenses-amount").value;

      if (itemExpenses !== "" && cashExpenses !== "") {
        this.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  getIncome: function () {
    incomeItems.forEach((item) => {
      let itemIncome = item.querySelector(".income-title").value;
      let cashIncome = item.querySelector(".income-amount").value;
      if (itemIncome !== "" && cashIncome !== "") {
        this.income[itemIncome] = cashIncome;
      }
    });
  },
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.children[0].value = "";
    cloneIncomeItem.children[1].value = "";
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
  // Метод возвращает все расходы
  getExpensesMonth: function () {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
    return this.expensesMonth;
  },
  // Метод возвращает все доп доходы
  getIncomeMonth: function () {
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
    return this.incomeMonth;
  },
  // Метод возвращает доходы за месяц + бюджет на день
  getBudget: function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  },
  getStatusIncome: function () {
    if (this.budgetDay >= 1200) {
      console.log("У вас высокий уровень дохода");
    } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
      console.log("У вас средний уровень дохода");
    } else if (this.budgetDay < 600 && this.budgetDay > 0) {
      console.log("У вас низкий уровень дохода");
    } else if (this.budgetDay === 0) {
      console.log("У вас нет доходов");
    } else {
      console.log("Что-то пошло не так");
    }
  },
  getInfoDeposit: function () {
    if (this.deposit) {
      do {
        this.percentDeposit = prompt("Какой годовой процент?", 10);
      } while (!isNumber(this.percentDeposit));
      do {
        this.moneyDeposit = prompt("Какая сумма заложена?", 10000);
      } while (!isNumber(this.moneyDeposit));
    }
  },
  calcSavedMoney: function () {
    return this.budgetMonth * periodRange.value;
  },
  reset: function () {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.incomeMonth = 0;
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    periodRange.value = 1;
    document
      .querySelectorAll("[type = 'text']")
      .forEach((elem) => (elem.value = ""));
    document
      .querySelectorAll(
        ".salary-amount, .income-amount, .income-title, .additional_income-item"
      )
      .forEach((elem) => elem.removeAttribute("disabled"));
    document
      .querySelectorAll(
        ".expenses-amount, .expenses-title, .additional_expenses-item, .target-amount"
      )
      .forEach((elem) => elem.removeAttribute("disabled"));
    for (let i = 1; i < incomeItems.length; i++) {
      incomeItems[i].parentNode.removeChild(incomeItems[i]);
    }
    for (let i = 1; i < expensesItems.length; i++) {
      expensesItems[i].parentNode.removeChild(expensesItems[i]);
    }
    firstPlusBtn.style.display = "block";
    secondPlusBtn.style.display = "block";
    document.querySelector(".period-amount").textContent = periodRange.value;
  },
};

const checkSalaryField = function () {
    if (salaryAmount.value.trim() !== "") {
      start.disabled = false;
    }
    return;
  },
  startAppData = appData.start.bind(appData),
  clickedStart = function () {
    startAppData();
    document
      .querySelectorAll(
        ".salary-amount, .income-amount, .income-title, .additional_income-item"
      )
      .forEach((elem) => elem.setAttribute("disabled", "disabled"));
    document
      .querySelectorAll(
        ".expenses-amount, .expenses-title, .additional_expenses-item, .target-amount"
      )
      .forEach((elem) => elem.setAttribute("disabled", "disabled"));

    start.style.display = "none";
    cancel.style.display = "block";
  },
  resetAppData = appData.reset.bind(appData),
  clickedCancel = function () {
    resetAppData();
    cancel.style.display = "none";
    start.style.display = "block";
    start.disabled = true;
  };

salaryAmount.focus();

start.disabled = true;

salaryAmount.addEventListener("input", checkSalaryField);

secondPlusBtn.addEventListener("click", appData.addExpensesBlock);

firstPlusBtn.addEventListener("click", appData.addIncomeBlock);

periodRange.addEventListener("input", function (e) {
  let periodAmount = document.querySelector(".period-amount");
  periodAmount.textContent = e.target.value;
});

start.addEventListener("click", clickedStart);

cancel.addEventListener("click", clickedCancel);
