"use strict";
const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const isString = function (value) {
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
  cancel = document.getElementById("cancel"),
  depositBank = document.querySelector(".deposit-bank"),
  depositAmount = document.querySelector(".deposit-amount"),
  depositPercent = document.querySelector(".deposit-percent");

let expensesItems = document.querySelectorAll(".expenses-items"),
  incomeItems = document.querySelectorAll(".income-items");

class AppData {
  constructor() {
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
  }
  showResult() {
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
  }
  getExpInc() {
    const count = (item) => {
      const startStr = item.className.split("-")[0];
      let itemTitle = item.querySelector(`.${startStr}-title`).value;
      let itemAmount = item.querySelector(`.${startStr}-amount`).value;
      if (itemTitle !== "" && itemAmount !== "") {
        this[startStr][itemTitle] = itemAmount;
      }
    };

    incomeItems.forEach(count);

    expensesItems.forEach(count);
  }
  addExpensesBlock() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.children[0].value = "";
    cloneExpensesItem.children[1].value = "";
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, secondPlusBtn);
    expensesItems = document.querySelectorAll(".expenses-items");
    if (expensesItems.length === 3) {
      secondPlusBtn.style.display = "none";
    }
  }
  addIncomeBlock() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.children[0].value = "";
    cloneIncomeItem.children[1].value = "";
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, firstPlusBtn);
    incomeItems = document.querySelectorAll(".income-items");
    if (incomeItems.length === 3) {
      firstPlusBtn.style.display = "none";
    }
  }
  getAddExpenses() {
    let addExpenses = addExpensesField.value.split(",");
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== "") {
        item = item.trim().slice(0, 1).toUpperCase() + item.trim().slice(1);
        this.addExpenses.push(item);
      }
    });
  }
  getAddIncome() {
    addIncomeItem.forEach((item) => {
      let itemValue = item.value.trim();
      if (itemValue !== "") {
        this.addIncome.push(itemValue);
      }
    });
  }
  // Метод возвращает все расходы
  getExpensesMonth() {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
    return this.expensesMonth;
  }
  // Метод возвращает все доп доходы
  getIncomeMonth() {
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
    return this.incomeMonth;
  }
  // Метод возвращает доходы за месяц + бюджет на день
  getBudget() {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth =
      this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }
  getTargetMonth() {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  }
  getStatusIncome() {
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
  }
  calcSavedMoney() {
    return this.budgetMonth * periodRange.value;
  }
  reset() {
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
    cancel.style.display = "none";
    start.style.display = "block";
    depositCheckbox.checked = false;
    start.disabled = true;
    depositBank.style.display = "none";
    depositAmount.style.display = "none";
    depositPercent.style.display = "none";
    depositBank.value = "";
    depositAmount.value = "";
  }
  checkSalaryField() {
    if (salaryAmount.value.trim() !== "") {
      start.disabled = false;
    }
  }
  checkPercentField() {
    if (
      isNumber(depositPercent.value) &&
      depositPercent.value <= 100 &&
      depositPercent.value > 0
    ) {
      console.log(depositPercent.value);
      start.disabled = false;
    } else {
      alert("Некорректное значение процентов");
      start.disabled = true;
    }
  }
  start() {
    this.budget = +salaryAmount.value;

    this.getExpInc();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getIncomeMonth();
    this.getInfoDeposit();
    this.getBudget();
    this.showResult();

    document
      .querySelectorAll(
        ".salary-amount, .income-amount, .income-title, .additional_income-item"
      )
      .forEach((elem) => elem.setAttribute("disabled", "disabled"));
    document
      .querySelectorAll(
        ".expenses-amount, .expenses-title, .additional_expenses-item, .target-amount, .deposit-amount, .deposit-percent, .deposit-bank"
      )
      .forEach((elem) => elem.setAttribute("disabled", "disabled"));

    start.style.display = "none";
    cancel.style.display = "block";
  }
  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = +depositPercent.value;
      this.moneyDeposit = +depositAmount.value;
    }
  }
  changePercent() {
    const valueSelect = this.value;
    if (valueSelect === "other") {
      depositPercent.style.display = "inline-block";
    } else {
      depositPercent.value = valueSelect;
    }
  }
  depositeHandler() {
    if (depositCheckbox.checked) {
      depositBank.style.display = "inline-block";
      depositAmount.style.display = "inline-block";
      this.deposit = true;
      depositBank.addEventListener("change", this.changePercent);
    } else {
      depositBank.style.display = "none";
      depositAmount.style.display = "none";
      depositBank.value = "";
      depositAmount.value = "";
      this.deposit = false;
      depositBank.removeEventListener("change", this.changePercent);
    }
  }
  eventListeners() {
    salaryAmount.addEventListener("input", this.checkSalaryField);

    depositPercent.addEventListener("change", this.checkPercentField);

    secondPlusBtn.addEventListener("click", this.addExpensesBlock);

    firstPlusBtn.addEventListener("click", this.addIncomeBlock);

    start.addEventListener("click", this.start.bind(this));

    cancel.addEventListener("click", this.reset.bind(this));

    depositCheckbox.addEventListener("change", this.depositeHandler.bind(this));

    periodRange.addEventListener("input", function (e) {
      let periodAmount = document.querySelector(".period-amount");
      periodAmount.textContent = e.target.value;
    });
  }
}

const appData = new AppData();

appData.eventListeners();

salaryAmount.focus();

start.disabled = true;
