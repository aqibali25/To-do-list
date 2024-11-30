import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const taskInput = e.target.elements.taskInput.value;
    if (taskInput.trim()) {
      const newTask = { text: taskInput, completed: false };
      setTasks([...tasks, newTask]);
      e.target.elements.taskInput.value = "";
    }
  };

  const handleEditTask = (index) => {
    const updatedTasks = [...tasks];
    const newTaskText = prompt("Edit your task:", tasks[index].text);
    if (newTaskText !== null) {
      updatedTasks[index].text = newTaskText.trim();
      setTasks(updatedTasks);
    }
  };

  const handleRemoveTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleCompleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="container-fluid d-flex flex-column align-items-center bg-light vh-100 py-5">
      <div className="row justify-content-center align-items-center w-100">
        <div className="col-12 col-md-8 col-lg-6 p-4 bg-white rounded shadow-lg mt-5">
          <h1 className="text-center text-primary mb-4">To-Do List</h1>
          <form onSubmit={handleFormSubmit} className="w-100">
            <div className="input-group mb-3">
              <input
                className="form-control shadow-sm"
                type="text"
                placeholder="Add a task"
                name="taskInput"
                autoComplete="off"
                required
              />
              <button className="btn btn-success shadow-sm" type="submit">
                <i className="fas fa-plus"></i>
              </button>
            </div>
          </form>
          <div className="tasksContainer mt-4">
            <ul className="list-group">
              {tasks.length === 0 ? (
                <li className="list-group-item text-center text-muted">
                  No tasks added yet.
                </li>
              ) : (
                tasks.map((task, index) => (
                  <li
                    key={index}
                    className={`list-group-item d-flex justify-content-between align-items-center p-3 rounded mb-2 shadow-sm ${
                      task.completed ? "bg-light-green" : "bg-light"
                    }`}
                  >
                    <span
                      className="flex-fill text-truncate"
                      style={{
                        textDecoration: task.completed
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {task.text}
                    </span>
                    <div className="d-flex">
                      <button
                        className="btn btn-sm btn-primary me-2 rounded-circle"
                        onClick={() => handleEditTask(index)}
                      >
                        <i className="fas fa-pen"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-danger me-2 rounded-circle"
                        onClick={() => handleRemoveTask(index)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-success rounded-circle"
                        onClick={() => handleCompleteTask(index)}
                      >
                        <i className="fas fa-check"></i>
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
