const form = document.getElementById("add-task-form");
const taskInput = document.getElementById("new-task-input");
const tasksList = document.getElementById("tasks-list");

let tasks = [];

function addTask(task) {
  tasks.push(task);
  saveTasks();
  renderTasks();
}

function removeTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editTask(index, newTask) {
  tasks[index] = newTask;
  saveTasks();
  renderTasks();
}

function markAsCompleted(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  tasksList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    const taskName = document.createElement("span");
    const actions = document.createElement("div");
    const editButton = document.createElement("button");
    const removeButton = document.createElement("button");
    const completeButton = document.createElement("button");

    taskName.textContent = task.name;
    taskName.classList.add("task-name");

    editButton.textContent = "Edit";
    editButton.classList.add("edit");
    editButton.addEventListener(
      "click",
      () => prompt("Edit task", task.name) && editTask(index, task.name.trim())
    );

    removeButton.textContent = "Remove";
    removeButton.classList.add("remove");
    removeButton.addEventListener("click", () => removeTask(index));

    completeButton.textContent = task.completed ? "Incomplete" : "Completed";
    completeButton.classList.add("complete");
    completeButton.addEventListener("click", () => markAsCompleted(index));

    actions.classList.add("actions");
    actions.append(editButton, removeButton, completeButton);
    li.append(taskName, actions);
    tasksList.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!taskInput.value.trim()) return;
  addTask({ name: taskInput.value.trim(), completed: false });
  taskInput.value = "";
});

document.addEventListener("DOMContentLoaded", () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (savedTasks) tasks = savedTasks;
  renderTasks();
});
