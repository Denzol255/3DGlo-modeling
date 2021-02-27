"use strict";

class Todo {
  constructor(form, input, todoList, todoCompleted, todoContainer) {
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.todoList = document.querySelector(todoList);
    this.todoCompleted = document.querySelector(todoCompleted);
    this.todoContainer = document.querySelector(todoContainer);
    this.todoData = new Map(JSON.parse(localStorage.getItem("todo")));
  }

  addToStorage() {
    localStorage.setItem("todo", JSON.stringify([...this.todoData]));
  }

  render() {
    this.todoList.textContent = "";
    this.todoCompleted.textContent = "";
    this.todoData.forEach(this.createItem, this);
    this.handlerItem();
    this.addToStorage();
  }

  createItem(todo) {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.key = todo.key;
    li.insertAdjacentHTML(
      "beforeend",
      `<span class="text-todo">${todo.value}</span>
				<div class="todo-buttons">
					<button class="todo-remove"></button>
					<button class="todo-complete"></button>
				</div>`
    );

    if (todo.completed) {
      this.todoCompleted.append(li);
    } else {
      this.todoList.append(li);
    }
  }

  addTodo(e) {
    e.preventDefault();
    if (this.input.value.trim()) {
      const newTodo = {
        value: this.input.value,
        completed: false,
        key: this.generateKey(),
      };
      this.todoData.set(newTodo.key, newTodo);
      this.input.value = "";
      this.render();
    } else {
      alert("Вы должны указать дело");
    }
  }

  generateKey() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  deleteItem(liKey) {
    this.todoData.delete(liKey);
  }

  completedItem(liKey) {
    this.todoData.forEach((item) => {
      if (item.key === liKey) {
        item.completed = !item.completed;
      }
    });
  }

  handlerItem() {
    this.todoContainer.addEventListener("click", (event) => {
      const target = event.target;
      if (
        target.matches(".todo-list .todo-complete") ||
        target.matches(".todo-completed .todo-complete")
      ) {
        this.completedItem(target.parentNode.parentNode.key);
        this.render();
      } else if (
        target.matches(".todo-list .todo-remove") ||
        target.matches(".todo-completed .todo-remove")
      ) {
        this.deleteItem(target.parentNode.parentNode.key);
        this.render();
      }
    });
  }

  init() {
    this.form.addEventListener("submit", this.addTodo.bind(this));
    this.render();
  }
}

const todo = new Todo(
  ".todo-control",
  ".header-input",
  ".todo-list",
  ".todo-completed",
  ".todo-container"
);

todo.init();
