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

const AppData = function () {
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
};
AppData.prototype.start = function () {
  this.budget = +salaryAmount.value;

  this.getExpenses();
  this.getIncome();
  this.getExpensesMonth();
  this.getAddExpenses();
  this.getAddIncome();
  this.getIncomeMonth();
  this.getBudget();
  this.showResult();
};
AppData.prototype.showResult = function () {
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  addExpensesValue.value = this.addExpenses.join(", ");
  addIncomeValue.value = this.addIncome.join(", ");
  targetMonthValue.value = this.getTargetMonth();
  incomePeriodValue.value = this.calcSavedMoney();
  periodRange.addEventListener("input", (e) => {
    incomePeriodValue.value = this.budgetMonth * e.target.value;
  });
};
AppData.prototype.addExpensesBlock = function () {
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  cloneExpensesItem.children[0].value = "";
  cloneExpensesItem.children[1].value = "";
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, secondPlusBtn);
  expensesItems = document.querySelectorAll(".expenses-items");
  if (expensesItems.length === 3) {
    secondPlusBtn.style.display = "none";
  }
};
AppData.prototype.getExpenses = function () {
  expensesItems.forEach((item) => {
    let itemExpenses = item.querySelector(".expenses-title").value;
    let cashExpenses = item.querySelector(".expenses-amount").value;

    if (itemExpenses !== "" && cashExpenses !== "") {
      this.expenses[itemExpenses] = cashExpenses;
    }
  });
};
AppData.prototype.getIncome = function () {
  incomeItems.forEach((item) => {
    let itemIncome = item.querySelector(".income-title").value;
    let cashIncome = item.querySelector(".income-amount").value;
    if (itemIncome !== "" && cashIncome !== "") {
      this.income[itemIncome] = cashIncome;
    }
  });
};
AppData.prototype.addIncomeBlock = function () {
  let cloneIncomeItem = incomeItems[0].cloneNode(true);
  cloneIncomeItem.children[0].value = "";
  cloneIncomeItem.children[1].value = "";
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, firstPlusBtn);
  incomeItems = document.querySelectorAll(".income-items");
  if (incomeItems.length === 3) {
    firstPlusBtn.style.display = "none";
  }
};
AppData.prototype.getAddExpenses = function () {
  let addExpenses = addExpensesField.value.split(",");
  addExpenses.forEach((item) => {
    item = item.trim();
    if (item !== "") {
      item = item.trim().slice(0, 1).toUpperCase() + item.trim().slice(1);
      this.addExpenses.push(item);
    }
  });
};
AppData.prototype.getAddIncome = function () {
  addIncomeItem.forEach((item) => {
    let itemValue = item.value.trim();
    if (itemValue !== "") {
      this.addIncome.push(itemValue);
    }
  });
};
// Метод возвращает все расходы
AppData.prototype.getExpensesMonth = function () {
  for (let key in this.expenses) {
    this.expensesMonth += +this.expenses[key];
  }
  return this.expensesMonth;
};
// Метод возвращает все доп доходы
AppData.prototype.getIncomeMonth = function () {
  for (let key in this.income) {
    this.incomeMonth += +this.income[key];
  }
  return this.incomeMonth;
};
// Метод возвращает доходы за месяц + бюджет на день
AppData.prototype.getBudget = function () {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
};
AppData.prototype.getTargetMonth = function () {
  return Math.ceil(targetAmount.value / this.budgetMonth);
};
AppData.prototype.getStatusIncome = function () {
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
};
AppData.prototype.getInfoDeposit = function () {
  if (this.deposit) {
    do {
      this.percentDeposit = prompt("Какой годовой процент?", 10);
    } while (!isNumber(this.percentDeposit));
    do {
      this.moneyDeposit = prompt("Какая сумма заложена?", 10000);
    } while (!isNumber(this.moneyDeposit));
  }
};
AppData.prototype.calcSavedMoney = function () {
  return this.budgetMonth * periodRange.value;
};
AppData.prototype.reset = function () {
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
};
AppData.prototype.checkSalaryField = function () {
  if (salaryAmount.value.trim() !== "") {
    start.disabled = false;
  }
  return;
};
AppData.prototype.eventListeners = function () {
  salaryAmount.addEventListener("input", this.checkSalaryField);

  secondPlusBtn.addEventListener("click", this.addExpensesBlock);

  firstPlusBtn.addEventListener("click", this.addIncomeBlock);

  start.addEventListener("click", this.clickedStart);

  cancel.addEventListener("click", this.clickedCancel);

  periodRange.addEventListener("input", function (e) {
    let periodAmount = document.querySelector(".period-amount");
    periodAmount.textContent = e.target.value;
  });
};

const appData = new AppData();

AppData.prototype.clickedStart = function () {
  appData.start();
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
};

AppData.prototype.clickedCancel = function () {
  appData.reset();
  cancel.style.display = "none";
  start.style.display = "block";
  start.disabled = true;
};

appData.eventListeners();

salaryAmount.focus();

start.disabled = true;
