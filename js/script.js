"use strict";

const income = "Инвестиции",
  mission = 90000,
  period = 6;
let money = Number(prompt("Ваш месячный доход?", 40000)),
  addExpenses = prompt(
    "Перечислите возможные расходы за рассчитываемый период через запятую",
    "Драгоценности, одежда, бензин"
  ),
  deposit = confirm("Есть ли у вас депозит в банке?"),
  expenses1 = prompt("Введите обязательную статью расходов?", "Кварплата"),
  amount1 = +prompt("Во сколько это обойдется?", 3000),
  expenses2 = prompt("Введите обязательную статью расходов?", "Еда"),
  amount2 = +prompt("Во сколько это обойдется?", 1000);

let showTypeOf = function (data) {
    console.log(data, typeof data);
  },
  getExpensesMonth = function (am1, am2) {
    return am1 + am2;
  },
  getAccumulatedMonth = function (inc, exp) {
    return inc - exp;
  },
  AccumulatedMonth = getAccumulatedMonth(
    money,
    getExpensesMonth(amount1, amount2)
  ),
  getTargetMonth = function (mis, budget) {
    return Math.round(mis / budget);
  },
  budgetDay = Math.floor(AccumulatedMonth / 30),
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
console.log("Расходы за месяц:", getExpensesMonth(amount1, amount2));
console.log(addExpenses.toLowerCase().split(", "));
console.log(
  `Цель будет достигнута за ${getTargetMonth(
    mission,
    AccumulatedMonth
  )} месяцев (-а)`
);
console.log(`Бюджет на день: ${budgetDay}`);
getStatusIncome();
